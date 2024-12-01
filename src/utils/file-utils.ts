import { unlink } from "node:fs/promises";

export class FileUtils {
  static async isFileExistAndDestroyFile(path: string): Promise<void> {
    const file = Bun.file(path);
    const isFileExist = await file.exists();

    if (isFileExist) {
      await unlink(path);
    }
  }
}
