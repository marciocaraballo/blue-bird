import Image from 'next/image'
import Likes from '../feed/likes'
import CommentsLink from '../commentsLink'
import DateTime from './DateTime'
import Delete from './Icons/Delete'

export default function Tweet({
    tweet,
    addOptimisticTweet,
    canDelete,
    handleDelete,
}: {
    readonly tweet: TweetWithAuthor
    readonly addOptimisticTweet: (newTweet: TweetWithAuthor) => void
    readonly canDelete: boolean
    readonly handleDelete: (tweet: TweetWithAuthor) => Promise<void>
}) {
    return (
        <div className="border border-gray-800 border-t-0 px-4 py-4 flex flex-1">
            <div className="h-12 w-12">
                <Image
                    className="rounded-full"
                    src={tweet.author.avatar_url}
                    width={48}
                    height={48}
                    alt="Tweet creator user avatar image, as given by Github profile"
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
                        <DateTime createdAt={tweet.created_at} />
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
                    {canDelete ? (
                        <button
                            className="ml-2"
                            onClick={() => handleDelete(tweet)}
                        >
                            <Delete className="fill-gray-400 hover:fill-red-600" />
                        </button>
                    ) : null}
                </div>
            </div>
        </div>
    )
}
