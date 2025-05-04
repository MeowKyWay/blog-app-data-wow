import CommentCount from "@/app/blog/CommentCount";
import { TagBanner } from "@/app/components/user-interface/TagBanner";
import { UserCircle } from "@/app/components/user-interface/UserCircle";
import { PostListItem, Tag } from "@/app/lib/type";
import { useAuth } from "@/app/providers/AuthProvider";
import { usePosts } from "@/app/queries/useApi";
import { PencilIcon, TrashIcon } from "@heroicons/react/24/outline";
import { useRouter } from "next/navigation";
import { useState } from "react";
import UpdatePostModal from "./UpdatePostModal";

export function MyBlogList({
    search,
    tag,
}: {
    search: string;
    tag: Tag | null;
}) {

    const { data: posts, isLoading } = usePosts();
    const { userId } = useAuth();

    const filteredPosts = posts?.filter((post) => String(post.ownerId) === String(userId));

    return (
        <div className="flex flex-col rounded-xl bg-foreground">
            <div className="min-h-[400px]">
                <div className="flex flex-col">
                    {(filteredPosts ?? []).map((post) => (
                        <MyBlogListItem search={search} key={post.id} post={post} tag={tag} />
                    ))}
                </div>
            </div>
        </div>
    );
}

function MyBlogListItem({ post, search, tag }: {
    post: PostListItem, search: string, tag: Tag | null
}) {

    const router = useRouter();

    const [showEditModal, setShowEditModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);

    const regex = new RegExp(`(${search})`, 'gi');
    const parts = post.title.split(regex);

    if (tag && post.tag !== tag) return null;

    return (
        <>
            <div className="flex flex-col h-50 border-b box-border border-(--background) p-5 gap-2.5 relative
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
                    <div className="flex flex-col gap-[2px]"><h2 className="line-clamp-1">
                        {parts.map((part, index) =>
                            part.toLowerCase() === search.toLowerCase() && search.length >= 2 ? (
                                <span key={index} className="bg-yellow-200 text-black">
                                    {part}
                                </span>
                            ) : (
                                part
                            )
                        )}
                    </h2>
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
                    <CommentCount count={post.commentsCount} />
                </div>
                <div className="flex flex-row absolute top-1.5 right-1.5 h-6 gap-[15px]">
                    <button className="p-1 rounded-full hover:bg-black/5 active:bg-black/10" onClick={(e) => {
                        e.stopPropagation();
                        setShowEditModal(true);
                    }}>
                        <PencilIcon className="h-4" />
                    </button>
                    <button className="p-1 rounded-full hover:bg-black/5 active:bg-black/10">
                        <TrashIcon className="h-4" />
                    </button>
                </div>
            </div>
            <UpdatePostModal post={post} show={showEditModal} onClose={() => setShowEditModal(false)} />
        </>
    );
}