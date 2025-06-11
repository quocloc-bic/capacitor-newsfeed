import { repositories } from "@/shared/repositories";
import type { NewsfeedStore } from "../newsfeed-page.store";
import type {
  StoreSetFunction,
  StoreGetFunction,
} from "@/shared/store/types/store.types";

const fetchNewsfeed =
  (
    set: StoreSetFunction<NewsfeedStore>,
    get: StoreGetFunction<NewsfeedStore>
  ) =>
  async (lastCreatedAt?: Date) => {
    try {
      const {
        state: { articleIds },
      } = get();

      set((state) => {
        if (lastCreatedAt) {
          state.state.loadingMore = true;
        } else {
          state.state.loading = true;
        }
      });

      const result = await repositories.article.getArticles(lastCreatedAt);

      const { articles: newArticles, lastCreatedAt: newLastCreatedAt } = result;

      const updatedArticles = Array.from(
        new Set([...articleIds, ...newArticles.map(({ id }) => id)])
      );

      set((state) => {
        state.state.articleIds = updatedArticles;
        state.state.lastCreatedAt = newLastCreatedAt;
        state.state.loading = false;
        state.state.loadingMore = false;
      });

      return newArticles;
    } catch (error) {
      console.error("Failed to fetch newsfeed:", error);
      set((state) => {
        state.state.loading = false;
        state.state.loadingMore = false;
      });
      throw error;
    }
  };

export default fetchNewsfeed;
