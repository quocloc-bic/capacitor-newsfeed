import React, { createContext, useContext, useMemo, useState } from "react";
import type { ReactNode } from "react";
import type { Value } from "@udecode/plate";

interface TextEditorContextType {
  value: Value;
  jsonValue: string;
  setValue: (value: Value) => void;
}

const TextEditorContext = createContext<TextEditorContextType | undefined>(
  undefined
);

export const TextEditorProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [value, setValue] = useState<Value>([]);

  const jsonValue = useMemo(() => {
    return JSON.stringify(value, null, 2);
  }, [value]);

  return (
    <TextEditorContext.Provider value={{ value, jsonValue, setValue }}>
      {children}
    </TextEditorContext.Provider>
  );
};

export const useTextEditorContext = () => {
  const context = useContext(TextEditorContext);
  if (!context) {
    throw new Error(
      "useTextEditorContext must be used within a TextEditorProvider"
    );
  }
  return context;
};
