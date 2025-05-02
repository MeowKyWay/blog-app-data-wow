export default function Button({
    label,
    onClick,
    type = "submit",
}: {
    label: string;
    onClick: () => void;
    type?: "submit" | "reset";
}) {
    return (
        <button
            type={type}
            onClick={onClick}
            className={`${type === "submit" ? 'bg-secondary' : "bg-warning"} 
            text-primary-variant hover:brightness-90 active:brightness-110 
            rounded-md p-2 
            transition duration-50 ease-in-out`
            }
        >
            {label}
        </button>
    );
}