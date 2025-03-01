import type { Metadata } from 'next'
import { Work_Sans, Roboto } from 'next/font/google'
import './globals.css'

const workSans = Work_Sans({ subsets: ['latin'], variable: '--font-work-sans' })
const roboto = Roboto({
  subsets: ['latin'],
  variable: '--font-roboto',
  weight: ['100', '300', '400', '500', '700', '900'],
})

export const metadata: Metadata = {
  title: 'Companies Marketplace',
  description: 'Buy and sell companies',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang='en'>
      <body
        className={`${workSans.variable} ${roboto.variable}`}
      >
        {children}
      </body>
    </html>
  )
}
