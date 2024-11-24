import type { MemeType } from "../model/meme-type-model";

export class FormatQueryParamsUtils {
  static formatQueryParamsMemeTypes(memeTypes: any): number[] {
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

    //return idMemeTypes;
  }
}
