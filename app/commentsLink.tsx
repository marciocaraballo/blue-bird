'use client'

import Link from 'next/link'

export default function CommentsLink({ tweet } : { tweet: TweetWithAuthor }) {
    return (<Link className="text-gray-400" href={`comments/${tweet.id}`}>Comments</Link>)
}