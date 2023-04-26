"use client"
import { Navbar } from '../components/Navbar'
import './globals.css'
import { ThemeProvider } from 'next-themes'

// export const metadata = {
//   title: 'Ihsan An-Nashir - Portfolio',
//   description: 'A Portfolio website of Ihsan An-Nashir',
// }

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <ThemeProvider enableSystem={true} attribute='class'>
          <Navbar />
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
