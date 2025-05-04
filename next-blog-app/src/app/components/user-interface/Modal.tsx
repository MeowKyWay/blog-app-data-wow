import { XMarkIcon } from "@heroicons/react/24/outline";
import Button from "./input/Button";

export function Modal({
    title,
    onClose,
    children,
    cancleLable = "Cancel",
    confirmLabel = "Confirm",
    onConfirm,
    onCancle,
}: {
    title: string;
    onClose: () => void;
    children: React.ReactNode;
    cancleLable?: string;
    confirmLabel?: string;
    onConfirm: () => void;
    onCancle: () => void;
}) {
    return (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/50 px-4 md:px-0">
            <div className="flex flex-col gap-2.5 relative
            p-4 w-full md:w-1/2 bg-foreground rounded-xl
            overflow-y-auto max-h-[90vh]">
                <button className="p-1 rounded-full 
                hover:bg-black/10 active:bg-black/30
                transition-all duration-100 ease-in-out
                absolute right-2 top-2"
                    onClick={onClose}>
                    <XMarkIcon className="w-6 h-6 stroke-2" />
                </button>
                <h1 className="mb-5">{title}</h1>
                {children}
                <div className="flex flex-col md:flex-row items-center md:justify-end gap-2.5 md:gap-3">
                    <Button label={cancleLable} onClick={onCancle} type="button" className="min-w-full md:min-w-25"/>
                    <Button label={confirmLabel} onClick={onConfirm} type="submit" className="min-w-full md:min-w-25"/>
                </div>
            </div>
        </div>
    )
}