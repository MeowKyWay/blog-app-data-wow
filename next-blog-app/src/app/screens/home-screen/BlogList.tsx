import { TagBanner } from "@/app/components/user-interface/TagBanner";
import { UserCircle } from "@/app/components/user-interface/UserCircle";
import { PostListItem } from "@/app/lib/type";
import { usePosts } from "@/app/queries/usePosts";
import { ChatBubbleOvalLeftIcon, UserCircleIcon } from "@heroicons/react/24/outline";
import { useRouter } from "next/navigation";

export function BlogList() {

    const { data: posts, isLoading } = usePosts();

    return (
        <div className="flex flex-col rounded-xl bg-foreground">
            <div className="min-h-[400px]">
                <div className="flex flex-col">
                    {(posts ?? []).map((post) => (
                        <BlogListItem key={post.id} post={post} />
                    ))}
                </div>
            </div>
        </div>
    );
}

function BlogListItem({ post }: { post: PostListItem }) {

    const router = useRouter();

    return (
        <div className="flex flex-col h-50 border-b box-border border-(--background) p-5 gap-2.5
        hover:bg-black/5 hover:cursor-pointer active:bg-black/10 transition duration-200 ease-in-out"
            onClick={() => router.push(`/blog/post/${post.id}`)}>
            <div className="flex flex-col gap-[15px] justify-start items-start">
                <div className="flex flex-row items-center h-8 gap-2.5 text-tertiary font-sm font-medium">
                    <UserCircle />
                    {post.owner.username}
                </div>
                <TagBanner tag={post.tag} />
            </div>
            <div className="flex flex-col gap-2.5">
                <div className="flex flex-col gap-[2px]">
                    <h2>{post.title}</h2>
                    <p style={{
                        display: '-webkit-box',
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: 'vertical',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'normal',
                        wordBreak: 'break-word',
                        lineHeight: '15px',
                        minHeight: '30px',
                        maxHeight: '30px',
                    }}>
                        {post.content}
                    </p>
                </div>
                <div className="flex flex-row items-center
                gap-[5px] text-tertiary text-xs font-medium">
                    <ChatBubbleOvalLeftIcon className="h-[15px]" />
                    {post.commentsCount + " Comments"}
                </div>
            </div>
        </div>
    );
}