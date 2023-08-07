'use client'

import {
    User,
    createClientComponentClient,
} from '@supabase/auth-helpers-nextjs'
import Likes from './likes'
import { useEffect, experimental_useOptimistic as useOptimistic } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import CommentsLink from './commentsLink'
import getURL from './getUrl'

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
            <div
                key={tweet.id}
                className="border border-gray-800 border-t-0 px-4 py-8 flex flex-1"
            >
                <div className="h-12 w-12">
                    <Image
                        className="rounded-full"
                        src={tweet.author.avatar_url}
                        width={48}
                        height={48}
                        alt="tweet user avatar"
                    />
                </div>
                <div className="ml-4">
                    <p>
                        <span className="font-bold text-gray-400">
                            {tweet.author.name}
                        </span>
                        <span className="text-sm ml-2 text-gray-400">
                            @{tweet.author.username}
                        </span>
                        <span className="text-gray-400 text-sm ml-2">
                            {new Date(tweet.created_at).toLocaleString()}
                        </span>
                    </p>
                    <p className="text-gray-400 break-all w-[400px]">
                        {tweet.title}
                    </p>
                    <div className="flex flex-1 items-center mt-2">
                        <Likes
                            tweet={tweet}
                            addOptimisticTweet={addOptimisticTweet}
                        />
                        <CommentsLink tweet={tweet} />
                    </div>
                </div>
                {user.id === tweet.author.id ? (
                    <div className="ml-2">
                        <button onClick={() => handleDelete(tweet)}>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className="fill-gray-400 hover:fill-red-600"
                            >
                                <polyline points="3 6 5 6 21 6"></polyline>
                                <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                                <line x1="10" y1="11" x2="10" y2="17"></line>
                                <line x1="14" y1="11" x2="14" y2="17"></line>
                            </svg>
                        </button>
                    </div>
                ) : null}
            </div>
        )
    })
}
