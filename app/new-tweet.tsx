import { User, createServerActionClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from 'next/headers';
import Image from 'next/image';

export default function NewTweet({ user }: { user: User }) {
 
    const addTweet = async (formData: FormData) => {
        "use server";
        const title = formData.get('title');
        const supabase = createServerActionClient({ cookies });

        await supabase
            .from("tweets")
            .insert({
                title,
                user_id: user.id
            })
    }

    return (
        <form className="border border-gray-800 border-t-0" action={addTweet}>
            <div className="flex py-8 px-4">
                <div className="bg-inherit h-12 w-12">
                    <Image 
                        className="rounded-full"
                        src={user.user_metadata.avatar_url} 
                        alt="user avatar"
                        width={48}
                        height={48}/>
                </div>
                <input 
                    className="bg-inherit flex-1 ml-2 text-2xl leading-loose placeholder-gray-500 px-2" 
                    type="text" 
                    name="title"
                    placeholder="What is happening?!" />
            </div>
        </form>
    );
}