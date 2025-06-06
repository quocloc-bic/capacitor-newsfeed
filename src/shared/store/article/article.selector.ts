import type { ArticleStore } from "./article.store";

const getArticle = (articleId: string) => {
  return (state: ArticleStore) => state.state.articles[articleId];
};

const articleSelectors = { getArticle };

export default articleSelectors;
