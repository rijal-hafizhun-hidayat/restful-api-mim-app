import type { meme_type, post, post_file } from "@prisma/client";
import type { MemeType } from "./meme-type-model";
import type { PostTypesWithMemeType } from "./post-type-model";

export interface PostQueryParams {
  search: string;
  meme_types: meme_type[];
}

export interface PostWithMemeTypesRequest {
  name: string;
  content: string;
  meme_types: MemeType[];
}

export interface PostsWithPostTypesAndPostFile {
  id: number;
  name: string;
  content: string;
  created_at: Date;
  updated_at: Date;
  post_file: post_file | null;
  post_types: PostTypesWithMemeType[];
}

export interface PostsWithPostTypesAndPostFileResponse {
  id: number;
  name: string;
  content: string;
  created_at: Date;
  updated_at: Date;
  post_file: post_file | null;
  post_types: PostTypesWithMemeType[];
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

export function toPostWithPostTypesAndPostFile(
  posts: PostsWithPostTypesAndPostFile[]
): PostsWithPostTypesAndPostFileResponse[] {
  return posts.map((post) => ({
    id: post.id,
    name: post.name,
    content: post.content,
    created_at: post.created_at,
    updated_at: post.updated_at,
    post_file: post.post_file
      ? {
          id: post.post_file.id,
          path: `${Bun.env.BASE_URL}/storage-file/post/${post.post_file.path}`,
          created_at: post.post_file.created_at,
          updated_at: post.post_file.updated_at,
          post_id: post.post_file.post_id,
          type_file: post.post_file.type_file,
        }
      : null,
    post_types: post.post_types.map((post_type) => ({
      id: post_type.id,
      post_id: post_type.post_id,
      meme_type_id: post_type.meme_type_id,
      created_at: post_type.created_at,
      updated_at: post_type.updated_at,
      meme_type: post_type.meme_type,
    })),
  }));
}

export function toSinglePostWithPostTypesAndPostFile(
  post: PostsWithPostTypesAndPostFile
): PostsWithPostTypesAndPostFileResponse {
  return {
    id: post.id,
    name: post.name,
    content: post.content,
    created_at: post.created_at,
    updated_at: post.updated_at,
    post_file: {
      id: post.post_file!.id,
      path: `${Bun.env.BASE_URL}/storage-file/post/${post.post_file!.path}`,
      created_at: post.post_file!.created_at,
      updated_at: post.post_file!.updated_at,
      post_id: post.post_file!.post_id,
      type_file: post.post_file!.type_file,
    },
    post_types: post.post_types.map((post_type) => ({
      id: post_type.id,
      post_id: post_type.post_id,
      meme_type_id: post_type.meme_type_id,
      created_at: post_type.created_at,
      updated_at: post_type.updated_at,
      meme_type: post_type.meme_type,
    })),
  };
}
