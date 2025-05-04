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

    let typeClass;

    switch (type) {
        case "button":
            typeClass = "bg-foreground outline outline-(--color-secondary) text-(--color-secondary)";
            break;
        case "submit":
            typeClass = "bg-secondary text-primary-variant";
            break;
        case "reset":
            typeClass = "bg-warning text-primary-variant";
            break;
        default:
    }

    return (
        <button
            type={type}
            onClick={onClick}
            className={`${typeClass}
            hover:brightness-90 active:brightness-110 
            rounded-md p-2 
            transition duration-100 ease-in-out `
                + className}
        >
            {label}
        </button>
    );
}