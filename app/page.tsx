import Directory from '@/components/Directory'
import { ThemeSwitch } from '@/components/providers/ThemeSwitch'
import Image from 'next/image'

export default function Home() {
  return (
    <div className='w-full h-full'>
      <Directory />
    </div>
  )
}
