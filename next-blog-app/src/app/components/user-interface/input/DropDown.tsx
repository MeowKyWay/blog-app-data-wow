import { ChevronDownIcon } from "@heroicons/react/24/outline";
import { useState, useRef, useEffect } from "react";

interface DropDownProps<T> {
    placeholder?: string;
    value?: T | null;
    options: T[];
    onSelect: (option: T) => void;
    toString: (value: T | null | undefined) => string;
    className?: string;
    keyExtractor?: (value: T) => string | number;
}

export default function DropDown<T>({
    placeholder = "Select an option",
    value,
    options,
    onSelect,
    toString,
    className,
    keyExtractor,
}: DropDownProps<T>) {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement | null>(null);

    const toggleDropdown = () => setIsOpen((prev) => !prev);

    const handleSelect = (option: T) => {
        onSelect(option);
        setIsOpen(false);
    };

    // Close dropdown on outside click
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                dropdownRef.current &&
                !dropdownRef.current.contains(event.target as Node)
            ) {
                setIsOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
        <div className={"relative " + className} ref={dropdownRef}>
            <button
                type="button"
                onClick={toggleDropdown}
                className="flex items-center justify-between w-full text-sm font-semibold 
          bg-background rounded-md p-2 min-w-[100px]
          hover:brightness-95 active:brightness-110 transition duration-100 ease-in-out"
                aria-haspopup="listbox"
                aria-expanded={isOpen}
            >
                <span>{value ? toString(value) : placeholder}</span>
                <ChevronDownIcon className="w-4.5 h-4.5 stroke-2 mt-0.5 ml-2" />
            </button>

            {isOpen && (
                <ul
                    className="absolute z-10 mt-1 w-full bg-white border border-gray-200 rounded-md shadow-lg max-h-60 overflow-auto"
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
                                className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer"
                            >
                                {toString(option)}
                            </li>
                        );
                    })}
                </ul>
            )}
        </div>
    );
}