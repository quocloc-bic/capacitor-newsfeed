import clsx from "clsx";

type TextEditorProps = React.HTMLAttributes<HTMLDivElement>;

const TextEditor = ({ className, ...props }: TextEditorProps) => {
  return (
    <div
      className={clsx(
        "bg-white border border-red-400 flex justify-center items-center",
        className
      )}
      {...props}
    >
      <p>Text Editor</p>
    </div>
  );
};

export default TextEditor;
