import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import Tweets from '../../tweets'
import NewComment from './newComment'
import Comments from './comments'
import EmptyMessage from '@/app/components/StaticMessage'
import StaticMessage from '@/app/components/StaticMessage'

export const dynamic = 'force-dynamic'

export default async function Page({
    params: { tweetId },
}: {
    params: { tweetId: string }
}) {
    const supabase = createServerComponentClient<Database>({ cookies })
    const {
        data: { session },
    } = await supabase.auth.getSession()

    if (!session) {
        redirect('/login')
    }

    const { data: tweetData } = await supabase
        .from('tweets')
        .select('*, author: profiles(*), likes(user_id), comments(*)')
        .eq('id', tweetId)
        .single()

    if (tweetData === null) return <EmptyMessage message="Tweet not found" />

    const { data: commentsData } = await supabase
        .from('comments')
        .select('*')
        .eq('tweet_id', tweetId)
        .order('created_at', {
            ascending: false,
        })

    const tweet: TweetWithAuthor = {
        ...tweetData,
        author: Array.isArray(tweetData.author)
            ? tweetData.author[0]
            : tweetData.author,
        user_has_liked_tweet: !!tweetData.likes.find(
            (like) => like.user_id === session.user.id
        ),
        likes: tweetData.likes.length,
        comments: tweetData.comments.length,
    }

    const comments: TweetCommentWithAuthor[] =
        commentsData?.map((comment) => ({
            ...comment,
            author: Array.isArray(tweetData.author)
                ? tweetData.author[0]
                : tweetData.author,
        })) ?? []

    return (
        <section>
            <Tweets tweets={[tweet]} user={session.user} />
            <NewComment user={session.user} tweetId={tweetId} />
            {comments === null || comments?.length === 0 ? null : (
                <div className="sticky top-[61px] bg-gray-900">
                    <StaticMessage message="Thread" />
                </div>
            )}
            <Comments comments={comments} user={session.user} />
        </section>
    )
}
