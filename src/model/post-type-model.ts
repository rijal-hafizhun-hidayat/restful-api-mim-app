import type { meme_type } from "@prisma/client";

export interface PostTypesWithMemeType {
  id: number;
  post_id: number;
  meme_type_id: number;
  created_at: Date;
  updated_at: Date;
  meme_type: meme_type;
}
