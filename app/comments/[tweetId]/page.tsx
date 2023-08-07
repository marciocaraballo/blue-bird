import MessageBox from "@/app/components/MessageBox";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export const dynamic = 'force-dynamic';

export default async function Page({ params: { tweetId }} : { params: { tweetId: string }}) {

  const supabase = createServerComponentClient<Database>({ cookies });
  const { data: { session }} = await supabase.auth.getSession();

  if (!session) {
    redirect('/login');
  }

  const { data } = await supabase
    .from('tweets')
    .select('*, author: profiles(*), likes(tweet_id)')
    .eq('id', tweetId);
  
  if (data === null) return (<p>Tweet not found</p>);

  return (
    <section>
      <div>
        <MessageBox placeholder="Say something!" avatarUrl={session.user.user_metadata.avatar_url}/>
      </div>
    </section>
  )
}