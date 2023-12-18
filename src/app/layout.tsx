import type { Metadata } from 'next'
import './globals.css'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { AuthProvider } from './Providers'
import { Roboto } from 'next/font/google'
import Head from 'next/head'

const roboto = Roboto({
  weight: '300',
  subsets: ['latin'],
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Free4Read',
  description: 'A Free online reading website',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <Head>
        <link rel="icon" href="icon.png" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      <body className={roboto.className}>
        <AuthProvider>
          {children}
        </AuthProvider>
        <ToastContainer />
      </body>
    </html>
  )
}
