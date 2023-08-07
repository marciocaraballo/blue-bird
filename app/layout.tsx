import './globals.css'
import type { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'Blue bird',
    description: 'Generated by create next app',
}

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <html lang="en">
            <body className="bg-none bg-gray-900 min-h-screen flex">
                <div className="w-full max-w-xl mx-auto">{children}</div>
            </body>
        </html>
    )
}
