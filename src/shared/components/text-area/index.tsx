import React from "react";

import { IonTextarea } from "@ionic/react";
import clsx from "clsx";
import "./custom.css";
import style from "./style.module.css";

type IonTextAreaProps = React.ComponentProps<typeof IonTextarea>;

type TextAreaProps = IonTextAreaProps;

const TextArea: React.FC<TextAreaProps> = ({
  className,
  ...props
}: TextAreaProps) => {
  return (
    <div className={clsx(style["container"], className)}>
      <IonTextarea shape="round" class="custom" {...props} />
    </div>
  );
};

export default TextArea;
