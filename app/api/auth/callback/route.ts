import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { NextResponse, type NextRequest } from 'next/server'
import { cookies } from 'next/headers'

export const dynamic = 'force-dynamic'

export async function GET(request: NextRequest) {
    const requestUrl = new URL(request.url)
    const code = requestUrl.searchParams.get('code')

    if (code) {
        /**
         * Cookie can only be read, so we need a middleware to refresh the session
         * By default, cookies have only read access so this component cannot update
         * the session token without the help of a middleware
         */
        const supabase = createRouteHandlerClient<Database>({ cookies })
        await supabase.auth.exchangeCodeForSession(code)
    }

    return NextResponse.redirect(requestUrl.origin + '/feed')
}
