import { UserIcon } from "@heroicons/react/24/outline";

export function UserCircle() {
    return (
        <div className={`flex items-center justify-center rounded-full bg-gray-200 p-0.5 h-full aspect-square`}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="text-tertiary">
                <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" />
            </svg>
        </div>
    );
}