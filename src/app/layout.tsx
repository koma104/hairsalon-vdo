import type { Metadata } from 'next'
import Header from '@/components/Header/Header'
import Footer from '@/components/Footer/Footer'
import { PageProvider } from '@/contexts/PageContext'
import './globals.css'

export const metadata: Metadata = {
  title: '美容室',
  description: '美容室のウェブサイト',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ja">
      <body>
        <PageProvider isSPAEnabled={true}>
          <Header />
          <main>{children}</main>
          <Footer />
        </PageProvider>
      </body>
    </html>
  )
}
