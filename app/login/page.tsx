import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import GithubButton from "./github-button";

export const dynamic = 'force-dynamic';

export default async function Login() {
    const supabase = createServerComponentClient<Database>({ cookies });

    const { data: { session }} = await supabase.auth.getSession();

    if (session) {
        redirect('/');
    }

    return (
        <div className="flex flex-1 justify-center items-center flex-col">
            <h1 className="text-2xl text-gray-400 mb-3">Blue Bird App</h1>
            <GithubButton/>
        </div>
    );
}