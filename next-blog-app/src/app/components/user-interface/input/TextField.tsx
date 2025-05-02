export default function TextField({
    label,
    placeholder,
    value,
    onChange,
    type = "text",
}: {
    label: string;
    placeholder: string;
    value: string;
    onChange: (value: string) => void;
    type?: string;
}) {
    return (
        <input
            type={type}
            placeholder={placeholder}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className="m-[1px] p-2 border-1 border-gray-300 rounded-md focus:border-2 focus:m-0 focus:outline-none focus:border-blue-500 bg-white"
        />
    );
}