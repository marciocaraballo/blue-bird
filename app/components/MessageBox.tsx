import Image from 'next/image';

export default function MessageBox(
    { avatarUrl, placeholder }: 
    { readonly avatarUrl: string, readonly placeholder: string }
) {
    return (
        <div className="flex py-8 px-4">
            <div className="bg-inherit h-12 w-12">
                <Image 
                    className="rounded-full"
                    src={avatarUrl} 
                    alt="user avatar"
                    width={48}
                    height={48}/>
            </div>
            <input 
                className="bg-inherit flex-1 ml-2 text-2xl leading-loose placeholder-gray-500 px-2 text-gray-400" 
                type="text" 
                name="title"
                placeholder={placeholder} />
        </div>
    );
}