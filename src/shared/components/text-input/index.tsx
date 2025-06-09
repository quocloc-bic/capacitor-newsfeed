import React from "react";

import { IonInput } from "@ionic/react";
import "./custom.css";
import { cn } from "@/shared/utils/globals";

type IonTextInputProps = React.ComponentProps<typeof IonInput>;

interface TextInputProps extends IonTextInputProps {
  onEnter?: () => void;
}

const TextInput: React.FC<TextInputProps> = ({
  className,
  onEnter,
  ...props
}: TextInputProps) => {
  return (
    <div className={cn(className)}>
      <IonInput
        shape="round"
        class="custom"
        {...props}
        onKeyDown={(e) => {
          props.onKeyDown?.(e);

          if (e.key === "Enter" && !e.shiftKey && onEnter) {
            e.preventDefault();
            onEnter();
          }
        }}
      />
    </div>
  );
};

export default TextInput;
