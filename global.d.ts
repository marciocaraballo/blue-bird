import { Database as DB } from '@/lib/database.types'

type Tweet = DB['public']['Tables']['tweets']['Row']
type Profile = DB['public']['Tables']['profiles']['Row']
type TweetCommentDB = DB['public']['Tables']['comments']['Row']

declare global {
    type Database = DB

    type TweetWithAuthor = Tweet & {
        author: Profile
        likes: number
        user_has_liked_tweet: boolean
        comments: number
    }

    type TweetCommentWithAuthor = TweetCommentDB & {
        author: Profile
    }
}
