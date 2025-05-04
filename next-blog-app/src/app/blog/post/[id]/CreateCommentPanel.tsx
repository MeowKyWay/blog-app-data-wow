'use client';

import RequireAuth from "@/app/components/auth/RequireAuth";
import Button from "@/app/components/user-interface/input/Button";
import TextAreaField from "@/app/components/user-interface/input/TextAreaField";
import { Modal } from "@/app/components/user-interface/Modal";
import { useAuth } from "@/app/providers/AuthProvider";
import { useCreateComment } from "@/app/queries/useApi";
import { useState } from "react";

export default function CreateCommentPanel({
    onClose,
    postId,
}: {
    onClose: () => void;
    postId: string;
}) {

    const [content, setContent] = useState<string>("");

    const { userId } = useAuth();
    const { mutate: comment, isPending, isError } = useCreateComment();

    const handleCreateComment = async () => {
        if (!content || !userId) return;
        await comment({
            content: content,
            postId: postId,
            ownerId: userId,
        });
        onClose();
    };

    return (
        <RequireAuth>
            <div className="block md:hidden">
                <Modal title="Add Comments" confirmLabel="Post" onClose={onClose} onConfirm={handleCreateComment} onCancle={onClose}>
                    <div className="flex flex-col gap-3.5">
                        <TextAreaField value={content} onChange={setContent} placeholder="What's on your mind..."
                            className="outline-(--color-secondary-variant) py-1"
                            rows={3} />
                    </div>
                </Modal>
            </div>
            <div className="hidden md:flex flex-col gap-2.5 w-full">
                <TextAreaField value={content} onChange={setContent} placeholder="What's on your mind..."
                    className="outline-(--color-secondary-variant) py-1"
                    rows={3} />
                <div className="flex flex-row items-center justify-end gap-3">
                    <Button label="Cancel" type="button" onClick={onClose} className="w-24" />
                    <Button label="Post" type="submit" onClick={handleCreateComment} className="w-24" />
                </div>
            </div>
        </RequireAuth>
    );
}