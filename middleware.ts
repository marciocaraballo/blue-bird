import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

/**
 * Will refresh the supabase session in case the cookie expires
 * if the cookie expires and user refreshes the app, cookie wont be
 * useful anymore and will leave the user in a non authenticated
 * state. Will refresh the cookie in bg automatically
 */
export async function middleware(req: NextRequest) {
    const res = NextResponse.next()
    const supabase = createMiddlewareClient({ req, res })
    await supabase.auth.getSession()
    /** res will load the server component route with the refreshed cookie */
    return res
}
