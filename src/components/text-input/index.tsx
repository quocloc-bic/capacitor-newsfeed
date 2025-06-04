import React from "react";

import { IonInput } from "@ionic/react";
import "./custom.css";
import style from "./style.module.css";
import { cn } from "@/utils/globals";

type IonTextInputProps = React.ComponentProps<typeof IonInput>;

type TextInputProps = IonTextInputProps;

const TextInput: React.FC<TextInputProps> = ({
  className,
  ...props
}: TextInputProps) => {
  return (
    <div className={cn(style["container"], className)}>
      <IonInput shape="round" class="custom" {...props} />
    </div>
  );
};

export default TextInput;
