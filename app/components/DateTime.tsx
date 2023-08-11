export default function DateTime({ createdAt }: { createdAt: string }) {
    return (<span>{new Date(createdAt).toUTCString()}</span>)
}