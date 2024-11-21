import { prisma } from "../app/database";
import {
  toPostFileResponse,
  type PostFileRespone,
} from "../model/post-file-model";

export class PostFileService {
  static async storePostFile(
    requestFile: Express.Multer.File,
    postId: number
  ): Promise<PostFileRespone> {
    const [storedPostFile] = await prisma.$transaction([
      prisma.post_file.create({
        data: {
          path: requestFile.filename,
          post_id: postId,
        },
      }),
    ]);

    return toPostFileResponse(storedPostFile);
  }
}
