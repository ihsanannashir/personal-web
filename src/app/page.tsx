import Image from 'next/image'
import { Inter } from 'next/font/google'
import HeroSection from '../components/HeroSection'
import AboutSection from '../components/AboutSection'
import ProjectSection from '../components/ProjectSection'

export const metadata = {
  title: 'Ihsan An-Nashir - Portfolio',
  description: 'A Portfolio website of Ihsan An-Nashir',
}

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <main className='mx-auto max-w-3xl px-4 sm:px-6 md:max-w-5xl'>
      <HeroSection/>
      <AboutSection/>
      <ProjectSection/>
    </main>
  )
}
