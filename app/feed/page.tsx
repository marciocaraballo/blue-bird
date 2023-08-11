import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import NewTweet from './newTweet'
import Tweets from './tweets'
import StaticMessage from '../components/StaticMessage'

export const dynamic = 'force-dynamic'

export default async function Home() {
    const supabase = createServerComponentClient<Database>({ cookies })
    const {
        data: { session },
    } = await supabase.auth.getSession()

    if (!session) return null

    const { data } = await supabase
        .from('tweets')
        .select('*, author: profiles(*), likes(user_id), comments(tweet_id)')
        .order('created_at', {
            ascending: false,
        })

    const tweets: TweetWithAuthor[] =
        data?.map((tweet) => ({
            ...tweet,
            author: Array.isArray(tweet.author)
                ? tweet.author[0]
                : tweet.author,
            user_has_liked_tweet: !!tweet.likes.find(
                (like) => like.user_id === session.user.id
            ),
            likes: tweet.likes.length,
            comments: tweet.comments.length,
        })) ?? []

    return (
        <>
            <NewTweet user={session.user} />
            <div className="sticky top-[61px] bg-gray-900">
                <StaticMessage message="Timeline" />
            </div>
            <Tweets tweets={tweets} user={session.user} />
        </>
    )
}
