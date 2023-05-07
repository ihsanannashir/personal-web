"use client"
import Footer from '../components/Footer'
import { Navbar } from '../components/Navbar'
import './globals.css'
import { ThemeProvider } from 'next-themes'

export default function RootLayout({ children }) {
  if (typeof window !== 'undefined') {
    // Perform localStorage action
    localStorage.theme = 'light'
  }
  
  return (
    <html lang="en">
      <body className='bg-white dark:bg-[#121212]'>
        <ThemeProvider enableSystem={true} attribute='class'>
          <Navbar />
          {children}
          <Footer/>
        </ThemeProvider>
      </body>
    </html>
  )
}
