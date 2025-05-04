import { ChatBubbleOvalLeftIcon } from "@heroicons/react/24/outline";

export default function CommentCount({ count }: { count: number }) {
    return (
        <div className="flex flex-row items-center
        gap-[5px] text-tertiary text-xs font-medium">
            <ChatBubbleOvalLeftIcon className="h-[15px]" />
            {count + " Comments"}
        </div>
    );
}