interface EmptyMessageProps {
    readonly message: string;
}

export default function EmptyMessage ({
    message
}: EmptyMessageProps) {
    return (
        <p className="border border-gray-800 border-t-0 px-4 py-8 text-gray-400 text-lg">
            {message}
        </p>
    )
}