import useCreateArticleStore from "@/pages/create-article/store/create-article-page.store";
import type { Value } from "@udecode/plate";
import TextEditor, {
  type TextEditorProps,
} from "@/shared/components/text-editor";
import { EditorEventEmitter } from "@/shared/components/text-editor/text-editor-context";
import useArticleStore from "@/shared/store/article/article.store";
import { useShallow } from "zustand/react/shallow";
import articleSelectors from "@/shared/store/article/article.selector";
import { useEffect } from "react";

export const textEditorValueEmitter = new EditorEventEmitter<Value>();

export const TextEditorWithEmitter: React.FC<TextEditorProps> = ({
  onContentChanged,
  ...props
}) => {
  return (
    <TextEditor
      onContentChanged={(value) => {
        textEditorValueEmitter.emit(value);
        onContentChanged?.(value);
      }}
      {...props}
    />
  );
};

export const TextEditorWithEmitterAndStore: React.FC<
  TextEditorProps & { articleId?: string }
> = ({ articleId, ...props }) => {
  const { setPayload } = useCreateArticleStore((state) => state.actions);
  const article = useArticleStore(
    useShallow(articleSelectors.getArticle(articleId || ""))
  );

  useEffect(() => {
    if (article) {
      setPayload(article);
    }
  }, [article]);

  return (
    <TextEditorWithEmitter
      article={article}
      onContentChanged={(value) => {
        setPayload({ content: JSON.stringify(value) });
      }}
      onTitleChanged={(value) => {
        setPayload({ title: value });
      }}
      onDescriptionChanged={(value) => {
        setPayload({ description: value });
      }}
      onCoverImageChanged={(value) => {
        setPayload({ coverImage: value });
      }}
      {...props}
    />
  );
};
