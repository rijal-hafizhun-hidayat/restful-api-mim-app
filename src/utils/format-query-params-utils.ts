import type { MemeType } from "../model/meme-type-model";

export class FormatQueryParamsUtils {
  static formatPublicQueryParamsMemeTypes(memeTypes: any): number[] {
    if (typeof memeTypes === "string") {
      const memeTypeId: number[] = [];
      const parsedMemeTypes: MemeType = JSON.parse(memeTypes);
      memeTypeId.push(parsedMemeTypes.id);
      return memeTypeId;
    } else {
      const parsedMemeTypes: MemeType[] = memeTypes.map((memeType: string) => {
        return JSON.parse(memeType);
      });
      return parsedMemeTypes.map((parsedMemeType) => {
        return parsedMemeType.id;
      });
    }
  }

  static formatAdminQueryParamsMemeTypes(memeTypes: any): number[] {
    return memeTypes.map((memeType: MemeType) => {
      return Number(memeType.id);
    });
  }
}
