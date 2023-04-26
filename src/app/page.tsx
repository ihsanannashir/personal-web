import Image from 'next/image'
import { Inter } from 'next/font/google'

export const metadata = {
  title: 'Ihsan An-Nashir - Portfolio',
  description: 'A Portfolio website of Ihsan An-Nashir',
}

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <main className="text-2xl">
      halo sanak sadonyo wei
    </main>
  )
}
