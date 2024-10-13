import type { Metadata } from 'next'
import localFont from 'next/font/local'
import { Toaster } from '@/components/ui/toaster'
import { Header } from '@/components/features/header'
import './globals.css'

const isocpeur = localFont({
    src: './fonts/ISOCPEUR.ttf',
    variable: '--font-isocpeur'
})

const isocp = localFont({
    src: './fonts/ISOCP Regular.ttf',
    variable: '--font-isocp'
})

const isocpeurItalic = localFont({
    src: './fonts/ISOCTEURItalic.ttf',
    variable: '--font-isocpeur-italic'
})

export const metadata: Metadata = {
    title: 'Portfolizer — Show Your Portfolio Everyone',
    description: 'Portfolizer — Showcase your portfolio to everyone. Sign up easily via email, Google, or GitHub. Create and publish detailed projects with descriptions, clients, complexity, timelines, links, features, and photos. Share your work and grow your presence!',
}

export default function RootLayout({
    children,
}: Readonly<{
  children: React.ReactNode;
}>) {
    return (
        <html lang='en'>
            <body className={`${isocpeur.variable} ${isocp.variable} ${isocpeurItalic.variable} font-[family-name:var(--font-isocpeur)] flex flex-col min-h-[99vh]`}>
                <Header />
                {children}
                <footer className='grid place-items-center border-gray-500 border-t h-12 mt-auto'>Created by Vladyslav Hryhola</footer>
                <Toaster />
            </body>
        </html>
    )
}
