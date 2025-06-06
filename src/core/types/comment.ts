import type { BaseEntity } from "./base";

interface Comment extends BaseEntity {
  articleId: string;
  comment: string;
}

export type { Comment };
