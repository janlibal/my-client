import type { Metadata } from 'next'
import '../styles/styles.css'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'My-Client poc',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (

    <html lang="en">
      <body>
        <nav className="top-nav">
          <div className="nav-text-large">smartbuy</div>
          <ul className="nav-list">
            <li>
              <Link href="/products">Products</Link>
            </li>
            <li>
              <Link href="/">Home</Link>
            </li>
          </ul>
        </nav>
        <div className="container">{children}</div>
      </body>
    </html>
    
  )
}
