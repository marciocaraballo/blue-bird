import MessageBox from '@/app/components/MessageBox'
import {
    User,
    createServerActionClient,
    createServerComponentClient,
} from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'

export const dynamic = 'force-dynamic'

export default async function Page({
    user,
    tweetId,
}: {
    user: User
    tweetId: string
}) {
    const onPostMessage = async (formData: FormData) => {
        'use server'
        const supabase = createServerActionClient({ cookies })
        const commentText = formData.get('comment')

        await supabase.from('comments').insert({
            tweet_id: tweetId,
            user_id: user.id,
            text: commentText,
        })
    }

    return (
        <MessageBox
            action={onPostMessage}
            name="comment"
            placeholder="Say something!"
            avatarUrl={user.user_metadata.avatar_url}
        />
    )
}
