import clsx from "clsx";
import React from "react";

interface DividerProps extends React.HTMLAttributes<HTMLDivElement> {
  height?: number;
  width?: number;
}

const Divider = ({ height = 1, width, className, ...props }: DividerProps) => {
  const defaultStyle = clsx(
    "bg-gray-200",
    height && "h-[1px] w-full",
    width && "w-[1px] h-full"
  );

  const finalClassName = clsx(defaultStyle, className);

  return <div className={finalClassName} {...props} />;
};

export default React.memo(Divider);
