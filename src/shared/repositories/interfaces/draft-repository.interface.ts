import type { CreateArticlePayload } from "@/core/types/create-article";

export interface DraftRepository {
  saveDraft(content: Partial<CreateArticlePayload>): Promise<void>;
  loadDraft(): Promise<Partial<CreateArticlePayload> | null>;
  clearDraft(): Promise<void>;
  startAutoSaveDraft(
    getContent: () => Partial<CreateArticlePayload>,
    onSave?: (date: Date) => void,
    interval?: number
  ): void;
  stopAutoSaveDraft(): void;
  getLastDraftSavedAt(): Date | null;
}

export type DraftRepositoryType = DraftRepository;
