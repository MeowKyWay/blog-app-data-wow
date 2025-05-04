import { ReactNode, useRef, useEffect } from "react";

export default function TextAreaField({
    placeholder,
    value,
    onChange,
    leadingIcon,
    className = "",
    rows = 1,
  }: {
    placeholder: string;
    value: string;
    onChange: (value: string) => void;
    leadingIcon?: ReactNode;
    className?: string;
    rows?: number;
  }) {
    const textareaRef = useRef<HTMLTextAreaElement | null>(null);
  
    const resize = () => {
      if (textareaRef.current) {
        textareaRef.current.style.height = "auto";
        textareaRef.current.style.height = textareaRef.current.scrollHeight + "px";
      }
    };
  
    useEffect(() => {
      resize();
    }, [value]);
  
    return (
      <div className={`flex items-start outline rounded-md px-2 py-1 min-h-0 ${className}`}>
        {leadingIcon && (
          <div className="mr-2 mt-1 flex-shrink-0 flex items-center justify-center h-4 w-4">
            {leadingIcon}
          </div>
        )}
        <textarea
          ref={textareaRef}
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onInput={resize}
          rows={rows}
          className="w-full h-full py-1 px-1 outline-none bg-transparent resize-none overflow-hidden"
        />
      </div>
    );
  }