'use client'

import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { useRouter } from 'next/navigation'

export default function LogoutButton() {
    const supabase = createClientComponentClient<Database>()
    const router = useRouter()

    const handleSignOut = async () => {
        await supabase.auth.signOut()
        router.refresh()
    }

    return (
        <button className="text-xs text-gray-400" onClick={handleSignOut}>
            Logout
        </button>
    )
}
