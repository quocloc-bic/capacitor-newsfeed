import { Storage } from "@capacitor/storage";
import type { Article } from "@/core/types/article";
import type { CreateArticlePayload } from "@/core/types/create-article";

type DraftContent = Partial<Article>;
export type { DraftContent };

const DRAFT_KEY = "draft_article_new";

export async function saveDraft(content: Partial<CreateArticlePayload>) {
  console.log("🚀 ~ draft.service.ts:11 ~ saveDraft ~ content:", content);

  await Storage.set({ key: DRAFT_KEY, value: JSON.stringify(content) });
}

export async function loadDraft(): Promise<Partial<CreateArticlePayload> | null> {
  const { value } = await Storage.get({ key: DRAFT_KEY });
  return value ? JSON.parse(value) : null;
}

export async function clearDraft() {
  stopAutoSaveDraft();
  await Storage.remove({ key: DRAFT_KEY });
}

let autosaveTimer: ReturnType<typeof setInterval> | null = null;
let prevContent: Partial<CreateArticlePayload> | null = null;
let lastDraftSavedAt: Date | null = null;

export function startAutoSaveDraft(
  getContent: () => Partial<CreateArticlePayload>,
  onSave?: (date: Date) => void,
  interval = 1000
) {
  stopAutoSaveDraft();
  autosaveTimer = setInterval(async () => {
    const content = getContent();
    if (JSON.stringify(content) !== JSON.stringify(prevContent)) {
      await saveDraft(content);
      prevContent = content ? { ...content } : null;
      lastDraftSavedAt = new Date();
      if (onSave) onSave(lastDraftSavedAt);
    }
  }, interval);
}

export function stopAutoSaveDraft() {
  if (autosaveTimer) {
    clearInterval(autosaveTimer);
    autosaveTimer = null;
  }
}

export function getLastDraftSavedAt() {
  return lastDraftSavedAt;
}
