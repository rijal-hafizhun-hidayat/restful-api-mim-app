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
import { ErrorResponse } from "../error/error-response";

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
    const { search, meme_types, cursor } = query;

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
          every: {
            meme_type_id: {
              in: memeTypesId,
            },
          },
        },
      });
    }

    const result = await prisma.post.findMany({
      take: cursor ? parseInt(cursor as string) : 2,
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

  static async findPostByPostId(postId: number): Promise<PostResponse> {
    const post = await prisma.post.findUnique({
      where: {
        id: postId,
      },
    });

    if (!post) {
      throw new ErrorResponse(404, "post not found");
    }

    return toPostResponse(post);
  }

  static async updatePostByPostId(
    postId: number,
    request: PostWithMemeTypesRequest
  ): Promise<PostResponse> {
    const requestBody: PostWithMemeTypesRequest = Validation.validate(
      PostValidation.postWithMemeTypesRequest,
      request
    );

    const isPostExist = await prisma.post.findUnique({
      where: {
        id: postId,
      },
    });

    if (!isPostExist) {
      throw new ErrorResponse(404, "post not found");
    }

    const requestMemeTypes = FormatRequest.formatRequestPostWithMemeTypes(
      requestBody.meme_types
    );

    const [updatedPost] = await prisma.$transaction([
      prisma.post.update({
        where: {
          id: postId,
        },
        data: {
          name: requestBody.name,
          content: requestBody.content,
          post_types: {
            create: requestMemeTypes,
          },
        },
      }),
    ]);

    return toPostResponse(updatedPost);
  }
}
