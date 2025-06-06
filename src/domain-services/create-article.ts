import useCreateArticleStore from "@/pages/create-article/store";
import useNewsfeedStore from "@/pages/newsfeed/store";

const useCreateArticleDomainService = () => {
  const { addArticle } = useNewsfeedStore((state) => state.actions);

  const isValidPayload = useCreateArticleStore(
    (state) => state.state.isValidPayload
  );

  const triggerCreateArticle = useCreateArticleStore(
    (state) => state.actions.triggerCreateArticle
  );

  const onCreateArticle = async () => {
    const article = await triggerCreateArticle();
    addArticle(article);
  };

  return { onCreateArticle, isSubmitDisabled: !isValidPayload };
};

export default useCreateArticleDomainService;
