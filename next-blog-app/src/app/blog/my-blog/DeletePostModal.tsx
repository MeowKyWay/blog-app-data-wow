import RequireAuth from "@/app/components/auth/RequireAuth";
import Button from "@/app/components/user-interface/input/Button";
import { Modal } from "@/app/components/user-interface/Modal";
import { PostListItem } from "@/app/lib/type";
import { useDeletePost } from "@/app/queries/useApi";

export default function DeletePostModal({
    post,
    show,
    onClose
}: {
    post: PostListItem;
    show: boolean;
    onClose: () => void;
}) {

    const { mutate: deletePost, isPending, error } = useDeletePost();

    const handleDeletePost = async () => {
        await deletePost(post.id);
        onClose();
    };

    return (
        show &&
        <RequireAuth>
            <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/50 px-4 md:px-0">
                <div className={`flex flex-col gap-2.5 relative
                p-4 w-full md:w-1/2 bg-foreground rounded-xl
                overflow-y-auto max-h-[90vh] max-w-75`}>
                    <h1 className={`text-center text-md`}>Please confirm if you wish to delete the post</h1>
                    <div className="flex flex-col gap-3.5">
                        <p className="text-center">Are you sure you want to delete the post? Once deleted, it cannot be recovered.</p>
                    </div>
                    <div className="flex flex-col md:flex-row items-center md:justify-end gap-2.5 md:gap-3">
                        <Button label='Cancle' onClick={onClose} type='button' className="flex-1 w-full" />
                        <Button label='Delete' onClick={handleDeletePost} type='reset' className="flex-1 w-full" />
                    </div>
                </div>
            </div>
        </RequireAuth>
    );
}