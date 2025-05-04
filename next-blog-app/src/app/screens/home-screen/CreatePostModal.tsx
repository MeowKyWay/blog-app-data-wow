'use client';

import DropDown from "@/app/components/user-interface/input/DropDown";
import TextAreaField from "@/app/components/user-interface/input/TextAreaField";
import TextField from "@/app/components/user-interface/input/TextField";
import { Modal } from "@/app/components/user-interface/Modal";
import { Tag, tags } from "@/app/lib/type";
import { useState } from "react";

export function CreatePostModal({ show, onClose }: { show: boolean; onClose: () => void }) {

    const [tag, setTag] = useState<Tag | null>(null);
    const [title, setTitle] = useState<string>("");
    const [content, setContent] = useState<string>("");

    return (
        show && <Modal title="Create Post" onClose={onClose} onConfirm={() => { }} onCancle={onClose}>
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
    );

}