'use client';

import RequireAuth from "@/app/components/auth/RequireAuth";
import DropDown from "@/app/components/user-interface/input/DropDown";
import TextAreaField from "@/app/components/user-interface/input/TextAreaField";
import TextField from "@/app/components/user-interface/input/TextField";
import { Modal } from "@/app/components/user-interface/Modal";
import { PostListItem, Tag, tags } from "@/app/lib/type";
import { useAuth } from "@/app/providers/AuthProvider";
import { useCreatePost, useUpdatePost } from "@/app/queries/useApi";
import { useState } from "react";

export default function UpdatePostModal({
    post,
    show,
    onClose
}: {
    post: PostListItem;
    show: boolean;
    onClose: () => void;
}) {

    const [tag, setTag] = useState<Tag>(post.tag);
    const [title, setTitle] = useState<string>(post.title);
    const [content, setContent] = useState<string>(post.content);

    const { mutate: updatePost, isPending, error } = useUpdatePost();

    // const { mutate: createPost, isPending, error } = useCreatePost();

    const { userId } = useAuth();

    const handleUpdatePost = async () => {
        if (!tag || !userId) return;
        await updatePost({
            id: post.id,
            tag: tag,
            title: title,
            content: content,
        });
        onClose();
    };

    return (
        show &&
        <RequireAuth>
            <Modal title="Edit Post" onClose={onClose} onConfirm={handleUpdatePost} onCancle={onClose}>
                <div className="flex flex-col gap-3.5">
                    <DropDown<Tag> value={tag} onSelect={setTag}
                        options={tags} toString={tag => tag ?? ""}
                        placeholder="Choose a community"
                        className="md:max-w-50"
                        type="secondary"
                        childClassName="justify-center" />
                    <TextField value={title} onChange={setTitle} placeholder="Title" className="outline-(--color-secondary-variant) py-1" />
                    <TextAreaField value={content} onChange={setContent} placeholder="What's on your mind..."
                        className="outline-(--color-secondary-variant) py-1"
                        rows={10} />
                </div>
            </Modal>
        </RequireAuth>
    );

}