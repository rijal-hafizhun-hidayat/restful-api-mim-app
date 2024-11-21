import type { post_file } from "@prisma/client";

export interface PostFileRespone {
  id: number;
  post_id: number;
  path: string;
  created_at: Date;
  updated_at: Date;
}

export function toPostFileResponse(postFile: post_file): PostFileRespone {
  return {
    id: postFile.id,
    post_id: postFile.post_id,
    path: postFile.path,
    created_at: postFile.created_at,
    updated_at: postFile.updated_at,
  };
}
