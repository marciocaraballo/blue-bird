import Image from 'next/image';

export default function MessageBox(
    { avatarUrl, placeholder, name, action }: 
    { readonly avatarUrl: string, readonly placeholder: string, readonly name: string, readonly action?: ((formData: FormData) => void) }
) {
    return (
        <form className="border border-gray-800 border-t-0" action={action}>
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
                    name={name}
                    placeholder={placeholder} />
            </div>
        </form>
    );
}