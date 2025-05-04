import { UserCircle } from "@/app/components/user-interface/UserCircle"
import { Comment } from "@/app/lib/type"
import { formatDistanceToNow } from "date-fns"

export default function CommentList({ comments }: {
    comments: Comment[]
}) {
    return (
        <div className="flex flex-col gap-6">
            {comments.map((comment) => (
                <CommentListItem key={comment.id} comment={comment} />
            ))}
        </div>
    )
}

function CommentListItem({ comment }: {
    comment: Comment
}) {

    const timeAgo = formatDistanceToNow(new Date(comment.createdAt ?? ''), { addSuffix: true });

    return (
        <div className="flex flex-col gap-2">
            <div className="flex flex-row gap-2.5 items-center h-10">
                <UserCircle />
                <h3>{comment.owner.username}</h3>
                <h4 className='text-tertiary'>{timeAgo}</h4>
            </div>
            <p className="ml-[50px]">{comment.content}</p>
        </div>
    )
}