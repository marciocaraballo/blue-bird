'use client'

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import Likes from "./likes";
import { useEffect, experimental_useOptimistic as useOptimistic } from "react";
import { useRouter } from "next/navigation";
import Image from 'next/image';

export default function Tweets({ tweets }: { tweets: TweetWithAuthor[]}) {

    const [optimisticTweets, addOptimisticTweet] = 
        useOptimistic<TweetWithAuthor[], TweetWithAuthor>(
            tweets, 
            (currentOptimisticTweets, newTweet) => {
                const newOptimisticTweets = [...currentOptimisticTweets];
                const index = newOptimisticTweets.findIndex(tweet => tweet.id === newTweet.id)
                newOptimisticTweets[index] = newTweet;
                return newOptimisticTweets;
            }
        );
    
    const router = useRouter();

    const supabase = createClientComponentClient(); 
    
    useEffect(() => {
        const channel = supabase
            .channel('realtime tweets')
            .on('postgres_changes', {
                event: '*',
                schema: 'public',
                table: 'tweets'
            }, payload => {
                router.refresh();
            })
            .subscribe();
        
            return () => {
                supabase.removeChannel(channel)
            }
    }, [supabase, router])

    return optimisticTweets.map(tweet => {
        return (
          <div key={tweet.id} className="border border-gray-800 border-t-0 px-4 py-8 flex">
            <div className="h-12 w-12">
                <Image 
                    className="rounded-full"
                    src={tweet.author.avatar_url}
                    width={48}
                    height={48}
                    alt="tweet user avatar"/>
            </div>
            <div className="ml-4">
                <p>
                    <span className="font-bold text-gray-400">{tweet.author.name}</span>
                    <span className="text-sm ml-2 text-gray-400">@{tweet.author.username}</span>
                    <span className="text-gray-400 text-sm ml-2">{new Date(tweet.created_at).toLocaleString()}</span>
                </p>
                <p className="text-gray-400">{tweet.title}</p>
                <Likes tweet={tweet} addOptimisticTweet={addOptimisticTweet}/>
            </div>
            </div>
        );
     })
}