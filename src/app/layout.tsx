"use client"
import Footer from '../components/Footer'
import { Navbar } from '../components/Navbar'
import './globals.css'
import { ThemeProvider } from 'next-themes'

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <ThemeProvider enableSystem={true} attribute='class'>
          <Navbar />
          {children}
          <Footer/>
        </ThemeProvider>
      </body>
    </html>
  )
}
