'use client'

import {
    User,
    createClientComponentClient,
} from '@supabase/auth-helpers-nextjs'
import { useEffect, experimental_useOptimistic as useOptimistic } from 'react'
import { useRouter } from 'next/navigation'
import getURL from '../getUrl'
import Tweet from '../components/Tweet'

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

    const router = useRouter()

    const supabase = createClientComponentClient()

    const handleDelete = async (tweet: TweetWithAuthor) => {
        await fetch(`${getURL()}/tweet/${tweet.id}`, {
            method: 'DELETE',
        })
    }

    useEffect(() => {
        const channel = supabase
            .channel('realtime tweets')
            .on(
                'postgres_changes',
                {
                    event: '*',
                    schema: 'public',
                    table: 'tweets',
                },
                (payload) => {
                    console.log('updating')
                    router.refresh()
                }
            )
            .subscribe()

        return () => {
            supabase.removeChannel(channel)
        }
    }, [supabase, router])

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
