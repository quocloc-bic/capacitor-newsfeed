import type { BaseEntity } from "./base";

interface Article extends BaseEntity {
  title: string;
  description: string;
  content: string;
  coverImage: string;
}

export type { Article };
