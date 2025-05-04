import { ChevronDownIcon } from "@heroicons/react/24/outline";
import { useState, useRef, useEffect } from "react";

interface DropDownProps<T> {
    placeholder?: string;
    value?: T | null;
    options: T[];
    onSelect: (option: T) => void;
    toString: (value: T | null | undefined) => string;
    className?: string;
    childClassName?: string;
    backdropDimmed?: boolean;
    keyExtractor?: (value: T) => string | number;
    type?: 'primary' | 'secondary';
}

export default function DropDown<T>({
    placeholder = "Select an option",
    value,
    options,
    onSelect,
    toString,
    backdropDimmed = false,
    className,
    childClassName,
    keyExtractor,
    type = 'primary',
}: DropDownProps<T>) {
    const [isOpen, setIsOpen] = useState(false);

    const toggleDropdown = () => setIsOpen((prev) => !prev);

    const handleSelect = (option: T) => {
        onSelect(option);
        setIsOpen(false);
    };

    const typeClass = type === 'primary' ? 'bg-background' : 'bg-white outline outline-(--secondary) text-(--secondary)';

    return (
        <div className={"relative " + className}>
            <button
                type="button"
                onClick={toggleDropdown}
                className={`flex items-center justify-between w-full text-sm font-semibold 
                    ${typeClass} rounded-md p-2 min-w-[100px]
                    hover:brightness-95 active:brightness-110 transition duration-100 ease-in-out ` + childClassName}
                aria-haspopup="listbox"
                aria-expanded={isOpen}
            >
                <span>{value ? toString(value) : placeholder}</span>
                <ChevronDownIcon className="w-4.5 h-4.5 stroke-2 mt-0.5 ml-2" />
            </button>

            {isOpen && (
                <>
                    {isOpen && (
                        <div className={`fixed inset-0 
                            ${backdropDimmed ? 'bg-black/30' : ''} 
                            md:!bg-transparent md z-0`}
                            onClick={() => setIsOpen(false)} />
                    )}
                    <ul
                        className="absolute z-10 mt-1 right-0 bg-white border border-gray-200 rounded-md shadow-lg min-w-full max-h-100 overflow-auto"
                        role="listbox"
                    >
                        {options.map((option) => {
                            const key =
                                keyExtractor?.(option) ?? toString(option) ?? Math.random();
                            return (
                                <li
                                    key={key}
                                    role="option"
                                    onClick={() => handleSelect(option)}
                                    className={`px-4 py-2 text-sm text-gray-700 
                                    hover:bg-gray-100 cursor-pointer 
                                    ${value === option ? 'bg-selected' : ''}
                                    flex flex-row items-center justify-between`}
                                >
                                    {toString(option)}
                                    <div className="w-10"></div>
                                    {value === option && (
                                        <span className="text-primary">✓</span>
                                    )}
                                </li>
                            );
                        })}
                    </ul>
                </>
            )}
        </div>
    );
}