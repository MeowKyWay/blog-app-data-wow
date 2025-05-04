'use client';

import Button from "@/app/components/user-interface/input/Button";
import TextAreaField from "@/app/components/user-interface/input/TextAreaField";
import { Modal } from "@/app/components/user-interface/Modal";
import { useState } from "react";

export default function CreateCommentPanel({
    onClose,
}: {
    onClose: () => void;
}) {

    const [content, setContent] = useState<string>("");

    return (
        <>
            <div className="block md:hidden">
                <Modal title="Add Comments" confirmLabel="Post" onClose={onClose} onConfirm={() => { }} onCancle={onClose}>
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
                    <Button label="Post" type="submit" onClick={() => { }} className="w-24" />
                </div>
            </div>
        </>
    );
}