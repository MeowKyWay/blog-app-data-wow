'use client';

import { usePost } from '@/app/queries/usePosts';
import { useParams, useRouter } from 'next/navigation';
import BackButton from './BackButton';

export default function PostPage() {
    const { id } = useParams();

    if (!id) {
        return <div>Post ID is required</div>;
    }
    if (typeof id !== 'string') {
        return <div>Post ID must be a string</div>;
    }

    const post = usePost(id);

    // You can fetch data here, e.g., using useEffect or directly from getServerSideProps / getStaticProps
    return (
        <div className='flex flex-col h-full w-full bg-foreground gap-10'>
            <BackButton />
        </div>
    );
}