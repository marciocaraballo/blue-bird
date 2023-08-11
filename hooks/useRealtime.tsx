import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'

export default function useRealtime(channelName: string, tableName: string) {
    const router = useRouter()
    const supabase = createClientComponentClient()

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
}
