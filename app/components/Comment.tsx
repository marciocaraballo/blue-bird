import Image from 'next/image'
import DateTime from './DateTime'
import Delete from './Icons/Delete'

export default function Comment({
    comment,
    canDelete,
    handleDelete,
}: {
    readonly comment: TweetCommentWithAuthor
    readonly canDelete?: boolean
    readonly handleDelete: (comment: TweetCommentWithAuthor) => void
}) {
    return (
        <div className="border border-gray-800 border-t-0 px-4 py-8 flex flex-1">
            <div className="h-12 w-12">
                <Image
                    className="rounded-full"
                    src={comment.author.avatar_url}
                    width={48}
                    height={48}
                    alt="tweet user avatar"
                />
            </div>
            <div className="ml-4">
                <p>
                    <span className="font-bold text-gray-400">
                        {comment.author.name}
                    </span>
                    <span className="text-sm ml-2 text-gray-400">
                        @{comment.author.username}
                    </span>
                    <span className="text-gray-400 text-sm ml-2">
                        <DateTime createdAt={comment.created_at} />
                    </span>
                </p>
                <p className="text-gray-400 break-all w-[400px]">
                    {comment.text}
                </p>
            </div>
            <div>
                {canDelete ? (
                    <button
                        className="ml-2 mt-0.5"
                        onClick={() => handleDelete(comment)}
                    >
                        <Delete className="fill-gray-400 hover:fill-red-600" />
                    </button>
                ) : null}
            </div>
        </div>
    )
}
