export default function Button({
    label,
    onClick,
    type = "submit",
    className = "",
}: {
    label: string;
    onClick: () => void;
    type?: "button" | "submit" | "reset";
    className?: string;
}) {
    return (
        <button
            type={type}
            onClick={onClick}
            className={`${type === "submit" ? 'bg-secondary' : "bg-warning"} 
            text-primary-variant hover:brightness-90 active:brightness-110 
            rounded-md p-2 
            transition duration-100 ease-in-out `
                + className}
        >
            {label}
        </button>
    );
}