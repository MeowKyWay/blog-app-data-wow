import { ReactNode } from "react";

export default function TextField({
    placeholder,
    value,
    onChange,
    type = "text",
    leadingIcon,
    className = "",
}: {
    placeholder: string;
    value: string;
    onChange: (value: string) => void;
    type?: string;
    leadingIcon?: ReactNode;
    className?: string;
}) {
    return (
        <div className={`flex flex-row items-center outline rounded-md px-2 ` + className}>
            {leadingIcon && (
                <div className="mr-2 flex-shrink-0 flex items-center justify-center h-4 w-4">
                    {leadingIcon}
                </div>
            )}
            <input
                type={type}
                placeholder={placeholder}
                value={value}
                onChange={(e) => onChange(e.target.value)}
                className="w-full py-1 px-1 outline-none bg-transparent"
            />
        </div>
    );
}