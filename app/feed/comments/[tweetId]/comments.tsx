'use client'

import Comment from '../../../components/Comment'
import StaticMessage from '@/app/components/StaticMessage'
import useRealtime from '@/hooks/useRealtime'

export default function Comments({
    comments,
}: {
    comments: TweetCommentWithAuthor[] | null
}) {
    useRealtime('realtime comments', 'comments')

    if (comments === null || comments?.length === 0) {
        return <StaticMessage message="No comments yet, be the first!" />
    }

    return (
        <section>
            <div className='sticky top-[61px] bg-gray-900'>
                <StaticMessage message="Thread" />
            </div>
            {comments.map((comment) => {
                return <Comment key={comment.id} comment={comment} />
            })}
        </section>
    )
}
