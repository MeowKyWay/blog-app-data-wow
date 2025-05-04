'use client';

import { usePost } from '@/app/queries/usePosts';
import { useParams } from 'next/navigation';
import BackButton from './BackButton';
import { UserCircle } from '@/app/components/user-interface/UserCircle';
import { formatDistanceToNow } from 'date-fns';
import { TagBanner } from '@/app/components/user-interface/TagBanner';
import CommentCount from '../../CommentCount';
import Button from '@/app/components/user-interface/input/Button';
import { useState } from 'react';
import CreateCommentPanel from './CreateCommentPanel';
import CommtentList from './CommentList';

export default function PostPage() {
    const { id } = useParams();

    if (!id) return <div>Post ID is required</div>;
    if (typeof id !== 'string') return <div>Post ID must be a string</div>;

    const { data: post, isLoading, isError } = usePost(id);

    const [showCreateCommentPanel, setShowCreateCommentPanel] = useState(false);

    if (isLoading) return <div>Loading...</div>;
    if (isError) return <div>Error loading post</div>;
    if (!post) return <div>Post not found</div>;

    const timeAgo = formatDistanceToNow(new Date(post.createdAt ?? ''), { addSuffix: true });

    // You can fetch data here, e.g., using useEffect or directly from getServerSideProps / getStaticProps
    return (
        <div className='h-full overflow-y-auto bg-foreground'>
            <div className='flex flex-row w-full bg-foreground pb-10'>
                <div className='flex-1 hidden md:block'></div>
                <div className='flex flex-col flex-16 pt-9 gap-10 px-4 md:px-0'>
                    <BackButton />
                    <div className='flex flex-col gap-6'>
                        <div className='flex flex-col gap-8 items-start'>
                            <div className='flex flex-col gap-4'>
                                <div className='flex flex-col gap-2.5 items-start'>
                                    <div className='flex flex-row items-center gap-2.5 h-12'>
                                        <UserCircle />
                                        <h3>{post?.owner.username}</h3>
                                        <h4 className='text-tertiary'>{timeAgo}</h4>
                                    </div>
                                    <TagBanner tag={`${post.tag}`} />
                                </div>
                                <div className='flex flex-col gap-7'>
                                    <div className='flex flex-col gap-2'>
                                        <h1>{post.title}</h1>
                                        <p style={{
                                            whiteSpace: 'pre-wrap',
                                            wordBreak: 'break-word',
                                            lineHeight: '15px',
                                            margin: 0,
                                        }}>
                                            {post.content}
                                        </p>
                                    </div>
                                    <CommentCount count={post.comments.length} />
                                </div>
                            </div>
                            <div className={`${showCreateCommentPanel ? 'hidden' : 'block'}`}>
                                <Button type='button' label='Add Comments' onClick={() => setShowCreateCommentPanel(prev => !prev)}></Button>
                            </div>
                            {showCreateCommentPanel && <CreateCommentPanel onClose={() => setShowCreateCommentPanel(prev => !prev)} />}
                        </div>
                        <CommtentList comments={post.comments} />
                    </div>
                </div>
                <div className='flex-3 hidden md:block'></div>
            </div>
        </div>
    );
}