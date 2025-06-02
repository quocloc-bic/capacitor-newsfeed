import React from "react";

type TableOfContentsProps = React.HTMLAttributes<HTMLDivElement>;

const TableOfContents: React.FC<TableOfContentsProps> = ({
  className,
  ...props
}) => {
  return (
    <div className={className} {...props}>
      <p>- Content 1</p>
      <p>- Content 2</p>
      <p>- Content 3</p>
      <p>- Content 4</p>
      <p>- Content 5</p>
      <p>- Content 6</p>
      <p>- Content 7</p>
    </div>
  );
};

export default TableOfContents;
