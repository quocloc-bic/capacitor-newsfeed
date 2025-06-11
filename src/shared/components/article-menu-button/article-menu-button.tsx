import React from "react";
import type { Article } from "@/core/types/article";
import OptionsMenu from "@/shared/components/options-menu/options-menu";
import { useArticleMenu } from "@/shared/components/article-menu-button/article-menu-button.hook";

interface ArticleMenuButtonProps {
  article: Article | null;
  onDidDelete?: (articleId: string) => void;
  className?: string;
  buttonClassName?: string;
  disabled?: boolean;
}

const ArticleMenuButton: React.FC<ArticleMenuButtonProps> = ({
  article,
  onDidDelete,
  className,
  buttonClassName,
  disabled,
}) => {
  const { menuOptions } = useArticleMenu({
    article,
    onDidDelete,
  });

  if (!article) {
    return null;
  }

  return (
    <OptionsMenu
      options={menuOptions}
      className={className}
      buttonClassName={buttonClassName}
      disabled={disabled}
    />
  );
};

export default ArticleMenuButton;
