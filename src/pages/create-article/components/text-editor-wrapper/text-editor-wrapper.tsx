import type { CreateArticlePayload } from "@/core/types/create-article";
import useCreateArticleStore from "@/pages/create-article/store/create-article-page.store";
import TextEditor, {
  type TextEditorProps,
} from "@/shared/components/text-editor";
import { EditorEventEmitter } from "@/shared/components/text-editor/text-editor-context";
import articleSelectors from "@/shared/store/article/article.selector";
import useArticleStore from "@/shared/store/article/article.store";
import type { Value } from "@udecode/plate";
import { useShallow } from "zustand/react/shallow";

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
  TextEditorProps & {
    articleId?: string;
    draft?: Partial<CreateArticlePayload>;
  }
> = ({ articleId, draft, ...props }) => {
  const { setPayload } = useCreateArticleStore((state) => state.actions);
  const article = useArticleStore(
    useShallow(articleSelectors.getArticle(articleId || ""))
  );

  const payload = article || draft;

  return (
    <TextEditorWithEmitter
      payload={payload}
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
