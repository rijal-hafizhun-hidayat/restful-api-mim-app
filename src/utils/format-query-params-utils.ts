import type { MemeType } from "../model/meme-type-model";

export class FormatQueryParamsUtils {
  static formatQueryParamsMemeTypes(memeTypes: any): number[] {
    if (typeof memeTypes === "string") {
      const memeTypeId: number[] = [];
      const parsedMemeTypes: MemeType = JSON.parse(memeTypes);

      memeTypeId.push(parsedMemeTypes.id);

      return memeTypeId;
    } else {
      return memeTypes.map((memeType: MemeType) => {
        return Number(memeType.id);
      });
    }
  }
}
