import MessageBox from "@/app/components/MessageBox";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import Tweets from "@/app/tweets";

export const dynamic = 'force-dynamic';

export default async function Page({ params: { tweetId }} : { params: { tweetId: string }}) {

  const supabase = createServerComponentClient<Database>({ cookies });
  const { data: { session }} = await supabase.auth.getSession();

  if (!session) {
    redirect('/login');
  }

  const { data } = await supabase
    .from('tweets')
    .select('*, author: profiles(*), likes(user_id)')
    .eq('id', tweetId)
    .single();
  
  if (data === null) return (<p>Tweet not found</p>);

  const tweet: TweetWithAuthor = {
    ...data,
    author: Array.isArray(data.author) ? data.author[0] : data.author,
    user_has_liked_tweet: !!data.likes.find(like => like.user_id === session.user.id),
    likes: data.likes.length
  };

  return (
    <section>
      <Tweets tweets={[tweet]} user={session.user}/>
      <MessageBox
        name="comment" 
        placeholder="Say something!" 
        avatarUrl={session.user.user_metadata.avatar_url}/>
    </section>
  )
}