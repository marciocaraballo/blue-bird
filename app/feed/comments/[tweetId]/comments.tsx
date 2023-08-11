'use client'

import {
    User,
    createClientComponentClient,
} from '@supabase/auth-helpers-nextjs'
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Comment from '../../../components/Comment'
import StaticMessage from '@/app/components/StaticMessage'

export default function Comments({
    comments,
}: {
    comments: TweetCommentWithAuthor[] | null
}) {
    const supabase = createClientComponentClient()
    const router = useRouter()

    useEffect(() => {
        const channel = supabase
            .channel('realtime comments')
            .on(
                'postgres_changes',
                {
                    event: '*',
                    schema: 'public',
                    table: 'comments',
                },
                (payload) => {
                    router.refresh()
                }
            )
            .subscribe()

        return () => {
            supabase.removeChannel(channel)
        }
    }, [supabase, router])

    if (comments === null || comments?.length === 0) {
        return <StaticMessage message="No comments yet, be the first!" />
    }

    return (
        <section>
            <StaticMessage message="Thread" />
            {comments.map((comment) => {
                return <Comment key={comment.id} comment={comment} />
            })}
        </section>
    )
}
