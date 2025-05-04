export function TagBanner({
    tag,
}: { tag: string }) {
    return (
        <div className="flex items-center justify-center bg-gray-200 h-6 px-2 text-gray-600 text-xs font-medium rounded-full">
            {tag}
        </div>
    );
}