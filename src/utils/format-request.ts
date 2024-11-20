import type { MemeType } from "../model/meme-type-model";

export class FormatRequest {
  static formatRequestPostWithMemeTypes(memeTypes: MemeType[]) {
    const date: Date = new Date();
    return memeTypes.map((memeType) => ({
      meme_type_id: memeType.id,
      created_at: date,
      updated_at: date,
    }));
  }
}
