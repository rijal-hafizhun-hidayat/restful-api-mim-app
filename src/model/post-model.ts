import type { post } from "@prisma/client";
import type { MemeType } from "./meme-type-model";

export interface PostWithMemeTypesRequest {
  name: string;
  content: string;
  meme_types: MemeType[];
}

export interface PostResponse {
  id: number;
  name: string;
  content: string;
  created_at: Date;
  updated_at: Date;
}

export function toPostResponse(post: post): PostResponse {
  return {
    id: post.id,
    name: post.name,
    content: post.content,
    created_at: post.created_at,
    updated_at: post.updated_at,
  };
}
