import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import LogoutButton from './logoutButton'
import { Analytics } from '@vercel/analytics/react'
import Link from 'next/link'

export const dynamic = 'force-dynamic'

export default async function Layout({
    children,
}: {
    children: React.ReactNode
}) {
    const supabase = createServerComponentClient<Database>({ cookies })
    const {
        data: { session },
    } = await supabase.auth.getSession()

    if (!session) {
        redirect('/login')
    }

    return (
        <>
            <div className="flex justify-between px-4 py-4 border border-gray-800 border-t-0">
                <Link className="text-gray-400 ml-2" href={`/feed`}>
                    <h1 className="text-xl font-bold text-gray-400">Home</h1>
                </Link>
                <LogoutButton />
            </div>
            {children}
            <Analytics />
        </>
    )
}
