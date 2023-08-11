'use client'

import Comment from '../../../components/Comment'
import StaticMessage from '@/app/components/StaticMessage'
import getURL from '@/app/getUrl'
import useRealtime from '@/hooks/useRealtime'
import { User } from '@supabase/supabase-js'

export default function Comments({
    comments,
    user,
}: {
    comments: TweetCommentWithAuthor[] | null
    user: User
}) {
    useRealtime('realtime comments', 'comments')

    if (comments === null || comments?.length === 0) {
        return <StaticMessage message="No comments yet, be the first!" />
    }

    const handleDelete = async (comment: TweetCommentWithAuthor) => {
        await fetch(`${getURL()}/comment/${comment.id}`, {
            method: 'DELETE',
        })
    }

    return comments.map((comment) => {
        return (
            <Comment
                key={comment.id}
                comment={comment}
                handleDelete={handleDelete}
                canDelete={user.id === comment.author.id}
            />
        )
    })
}
