import firebaseService from "@/shared/services/firebase/firebase-service";

const fetchNewsfeed =
  (set: (state: any) => void, get: () => any) =>
  async (lastCreatedAt?: Date) => {
    const {
      state: { articleIds },
    } = get();

    set((state: any) => {
      if (lastCreatedAt) {
        state.state.loadingMore = true;
      } else {
        state.state.loading = true;
      }
    });

    const result = await firebaseService.getArticles(lastCreatedAt);

    const { articles: newArticles, lastCreatedAt: newLastCreatedAt } = result;

    const updatedArticles = Array.from(
      new Set([...articleIds, ...newArticles.map(({ id }) => id)])
    );

    set((state: any) => {
      state.state.articleIds = updatedArticles;
      state.state.lastCreatedAt = newLastCreatedAt;
      state.state.loading = false;
      state.state.loadingMore = false;
    });

    return newArticles;
  };

export default fetchNewsfeed;
