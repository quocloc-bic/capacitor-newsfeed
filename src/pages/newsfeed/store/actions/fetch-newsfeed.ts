import firebaseService from "@/services/firebase/firebase-service";

const fetchNewsfeed =
  (set: (state: any) => void, get: () => any) =>
  async (lastCreatedAt?: Date) => {
    const {
      state: { articles },
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

    let updatedArticles = [...newArticles];
    if (lastCreatedAt) {
      updatedArticles = [...articles, ...newArticles];
    }

    set((state: any) => {
      state.state.articles = updatedArticles;
      state.state.lastCreatedAt = newLastCreatedAt;
      state.state.loading = false;
      state.state.loadingMore = false;
    });
  };

export default fetchNewsfeed;
