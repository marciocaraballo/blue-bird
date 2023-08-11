import { User, createServerActionClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import MessageBox from '../components/MessageBox'

export const dynamic = 'force-dynamic'

export default function NewTweet({ user }: { user: User }) {
    const addTweet = async (formData: FormData) => {
        'use server'
        const title = formData.get('title')
        const supabase = createServerActionClient({ cookies })

        await supabase.from('tweets').insert({
            title,
            user_id: user.id,
        })
    }

    return (
        <MessageBox
            action={addTweet}
            name="title"
            placeholder="What is happening?!"
            avatarUrl={user.user_metadata.avatar_url}
        />
    )
}
