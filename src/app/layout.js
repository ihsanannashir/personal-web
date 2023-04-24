import { Navbar } from '../../components/Navbar'
import './globals.css'

export const metadata = {
  title: 'Ihsan An-Nashir - Portfolio',
  description: 'A Portfolio website of Ihsan An-Nashir',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        {children}
      </body>
    </html>
  )
}
