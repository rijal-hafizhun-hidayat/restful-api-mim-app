import type { Request } from "express";
import {
  toPostResponse,
  toPostWithPostTypesAndPostFile,
  toSinglePostWithPostTypesAndPostFile,
  type PostResponse,
  type PostsWithPostTypesAndPostFileResponse,
  type PostWithMemeTypesRequest,
} from "../../model/post-model";
import { prisma } from "../../app/database";
import { FileUtils } from "../../utils/file-utils";
import { FormatRequest } from "../../utils/format-request";
import { ErrorResponse } from "../../error/error-response";
import { FormatQueryParamsUtils } from "../../utils/format-query-params-utils";
import { Validation } from "../../validation/validation";
import { PostValidation } from "../../validation/post-validation";

export class AdminPostService {
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
        FormatQueryParamsUtils.formatAdminQueryParamsMemeTypes(meme_types);

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
      take: cursor ? parseInt(cursor as string) : 5,
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

  static async findPostByPostId(
    postId: number
  ): Promise<PostsWithPostTypesAndPostFileResponse> {
    const post = await prisma.post.findUnique({
      where: {
        id: postId,
      },
      include: {
        post_file: true,
        post_types: {
          include: {
            meme_type: true,
          },
        },
      },
    });

    if (!post) {
      throw new ErrorResponse(404, "post not found");
    }

    return toSinglePostWithPostTypesAndPostFile(post);
  }

  static async updatePostByPostId(
    postId: number,
    request: PostWithMemeTypesRequest
  ): Promise<PostResponse> {
    const requestBody: PostWithMemeTypesRequest = Validation.validate(
      PostValidation.postRequest,
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

    const [destroyPostType, updatedPost] = await prisma.$transaction([
      prisma.post_type.deleteMany({
        where: {
          post_id: postId,
        },
      }),
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

  static async destroyPostByPostId(postId: number): Promise<PostResponse> {
    const post = await prisma.post.findUnique({
      where: {
        id: postId,
      },
      include: {
        post_file: true,
      },
    });

    if (!post) {
      throw new ErrorResponse(404, "post not found");
    }

    await FileUtils.isFileExistAndDestroyFile(
      `src/storage/post/${post.post_file?.path}`
    );

    const [destroyedPost] = await prisma.$transaction([
      prisma.post.delete({
        where: {
          id: postId,
        },
      }),
    ]);

    return toPostResponse(destroyedPost);
  }
}
