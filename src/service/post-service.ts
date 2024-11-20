import { prisma } from "../app/database";
import {
  toPostResponse,
  type PostResponse,
  type PostWithMemeTypesRequest,
} from "../model/post-model";
import { FormatRequest } from "../utils/format-request";
import { PostValidation } from "../validation/post-validation";
import { Validation } from "../validation/validation";

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
}
