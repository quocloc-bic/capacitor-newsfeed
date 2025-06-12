import type { DraftRepository } from "../interfaces/draft-repository.interface";
import type { CreateArticlePayload } from "@/core/types/create-article";
import {
  saveDraft as saveDraftService,
  loadDraft as loadDraftService,
  clearDraft as clearDraftService,
  startAutoSaveDraft as startAutoSaveDraftService,
  stopAutoSaveDraft as stopAutoSaveDraftService,
  getLastDraftSavedAt as getLastDraftSavedAtService,
} from "@/shared/services/draft.service";

export class LocalDraftRepository implements DraftRepository {
  async saveDraft(content: Partial<CreateArticlePayload>): Promise<void> {
    await saveDraftService(content);
  }

  async loadDraft(): Promise<Partial<CreateArticlePayload> | null> {
    return await loadDraftService();
  }

  async clearDraft(): Promise<void> {
    await clearDraftService();
  }

  startAutoSaveDraft(
    getContent: () => Partial<CreateArticlePayload>,
    onSave?: (date: Date) => void,
    interval?: number
  ): void {
    startAutoSaveDraftService(getContent, onSave, interval);
  }

  stopAutoSaveDraft(): void {
    stopAutoSaveDraftService();
  }

  getLastDraftSavedAt(): Date | null {
    return getLastDraftSavedAtService();
  }
}
