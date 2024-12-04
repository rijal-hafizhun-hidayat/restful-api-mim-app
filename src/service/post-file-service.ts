import { prisma } from "../app/database";
import { ErrorResponse } from "../error/error-response";
import {
  toPostFileResponse,
  type PostFileRespone,
} from "../model/post-file-model";
import { FileUtils } from "../utils/file-utils";

export class PostFileService {
  static async storePostFile(
    requestFile: Express.Multer.File,
    postId: number
  ): Promise<PostFileRespone> {
    const [storedPostFile] = await prisma.$transaction([
      prisma.post_file.create({
        data: {
          path: requestFile.filename,
          type_file: requestFile.mimetype,
          post_id: postId,
        },
      }),
    ]);

    return toPostFileResponse(storedPostFile);
  }

  static async updatePostFileByPostId(
    requestFile: Express.Multer.File,
    postId: number
  ): Promise<PostFileRespone> {
    const postFile = await prisma.post_file.findUnique({
      where: {
        post_id: postId,
      },
    });

    if (!postFile) {
      throw new ErrorResponse(404, "post_file not found");
    }

    if (requestFile) {
      await FileUtils.isFileExistAndDestroyFile(
        `src/storage/post/${postFile.path}`
      );
    }

    const [updatedPostFile] = await prisma.$transaction([
      prisma.post_file.update({
        where: {
          post_id: postId,
        },
        data: {
          path: requestFile.filename,
          type_file: requestFile.mimetype,
        },
      }),
    ]);

    return toPostFileResponse(updatedPostFile);
  }
}
