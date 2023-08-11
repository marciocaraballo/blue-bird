import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { NextResponse, type NextRequest } from 'next/server'
import { cookies } from 'next/headers'

export const dynamic = 'force-dynamic'

export async function DELETE(
    request: NextRequest,
    { params: { id } }: { params: { id: string } }
) {
    const supabase = createRouteHandlerClient<Database>({ cookies })

    const tweet = await supabase
        .from('comments')
        .delete()
        .match({
            id,
        })
        .select()

    return NextResponse.json(tweet.data)
}
