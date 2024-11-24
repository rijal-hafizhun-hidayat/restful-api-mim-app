import type { Request } from "express";
import { prisma } from "../app/database";
import {
  toPostResponse,
  toPostWithPostTypesAndPostFile,
  type PostResponse,
  type PostsWithPostTypesAndPostFileResponse,
  type PostWithMemeTypesRequest,
} from "../model/post-model";
import { FormatRequest } from "../utils/format-request";
import { PostValidation } from "../validation/post-validation";
import { Validation } from "../validation/validation";
import { FormatQueryParamsUtils } from "../utils/format-query-params-utils";

export class PostService {
  static async storePost(
    request: PostWithMemeTypesRequest
  ): Promise<PostResponse> {
    const requestBody: PostWithMemeTypesRequest = Validation.validate(
      PostValidation.postRequest,
      request
    );

    const requestMemeTypes = FormatRequest.formatRequestPostWithMemeTypes(
      requestBody.meme_types
    );

    const [storedPostPostTypes] = await prisma.$transaction([
      prisma.post.create({
        data: {
          name: requestBody.name,
          content: requestBody.content,
          post_types: {
            create: requestMemeTypes,
          },
        },
      }),
    ]);

    return toPostResponse(storedPostPostTypes);
  }

  static async getAllPost(
    query: Request["query"]
  ): Promise<PostsWithPostTypesAndPostFileResponse[]> {
    const { search, meme_types } = query;

    const postFilter: any = {};

    if (search) {
      postFilter.OR = [];
      postFilter.OR.push({
        name: {
          contains: search as string,
        },
      });

      postFilter.OR.push({
        content: {
          contains: search as string,
        },
      });
    }

    if (meme_types) {
      const memeTypesId: number[] =
        FormatQueryParamsUtils.formatQueryParamsMemeTypes(
          meme_types as string[]
        );

      postFilter.AND = [];
      postFilter.AND.push({
        post_types: {
          some: {
            meme_type_id: {
              in: memeTypesId,
            },
          },
        },
      });
    }

    const result = await prisma.post.findMany({
      where: postFilter,
      include: {
        post_file: true,
        post_types: {
          include: {
            meme_type: true,
          },
        },
      },
    });

    return toPostWithPostTypesAndPostFile(result);
  }
}
