'use client'

import { User } from '@supabase/auth-helpers-nextjs'
import { experimental_useOptimistic as useOptimistic } from 'react'
import getURL from '../getUrl'
import Tweet from '../components/Tweet'
import useRealtime from '@/hooks/useRealtime'

export default function Tweets({
    tweets,
    user,
}: {
    tweets: TweetWithAuthor[]
    user: User
}) {
    const [optimisticTweets, addOptimisticTweet] = useOptimistic<
        TweetWithAuthor[],
        TweetWithAuthor
    >(tweets, (currentOptimisticTweets, newTweet) => {
        const newOptimisticTweets = [...currentOptimisticTweets]
        const index = newOptimisticTweets.findIndex(
            (tweet) => tweet.id === newTweet.id
        )
        newOptimisticTweets[index] = newTweet
        return newOptimisticTweets
    })

    const handleDelete = async (tweet: TweetWithAuthor) => {
        await fetch(`${getURL()}/tweet/${tweet.id}`, {
            method: 'DELETE',
        })
    }

    useRealtime('realtime tweets', 'tweets')

    return optimisticTweets.map((tweet) => {
        return (
            <Tweet
                key={tweet.id}
                handleDelete={handleDelete}
                tweet={tweet}
                addOptimisticTweet={addOptimisticTweet}
                canDelete={user.id === tweet.author.id}
            />
        )
    })
}
