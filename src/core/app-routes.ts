export enum AppRoutes {
  Root = "/",
  Newsfeed = "/newsfeed",
  CreateArticle = "/create-article",
  ArticleDetail = "/article",
  EditArticle = "/edit-article",
}

export const appRoutesFactory = (id: string) => {
  return {
    [AppRoutes.ArticleDetail]: `/article?id=${id}`,
    [AppRoutes.EditArticle]: `/edit-article?id=${id}`,
  };
};
