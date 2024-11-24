import type { meme_type } from "@prisma/client";

export interface MemeType {
  id: number;
  name: string;
  background_color: string;
  text_color: string;
  created_at: Date;
  updated_at: Date;
}

export function toMemeTypeResponse(memeType: meme_type): MemeType {
  return {
    id: memeType.id,
    name: memeType.name,
    background_color: memeType.background_color,
    text_color: memeType.text_color,
    created_at: memeType.created_at,
    updated_at: memeType.updated_at,
  };
}

export function toMemeTypeResponseArray(memeTypes: meme_type[]): MemeType[] {
  return memeTypes.map((memeType) => ({
    id: memeType.id,
    name: memeType.name,
    background_color: memeType.background_color,
    text_color: memeType.text_color,
    created_at: memeType.created_at,
    updated_at: memeType.updated_at,
  }));
}
