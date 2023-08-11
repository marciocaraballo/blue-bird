interface StaticMessageProps {
    readonly message: string
}

export default function StaticMessage({ message }: StaticMessageProps) {
    return (
        <p className="border border-gray-800 border-t-0 px-4 py-4 text-gray-400 text-xl font-semibold text-center">
            {message}
        </p>
    )
}
