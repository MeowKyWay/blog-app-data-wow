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
            className="mt-1 p-2 border-2 border-gray-300 rounded-md focus:outline-none focus:border-blue-500 bg-white"
        />
    );
}