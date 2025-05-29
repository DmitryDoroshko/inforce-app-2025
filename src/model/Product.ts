import type { IComment } from "./Comment.ts";

export interface IProduct {
  id: string;
  imageUrl: string;
  name: string;
  count: number;
  size: {
    width: number;
    height: number;
  },
  weight: string;
  comments: IComment[];
}