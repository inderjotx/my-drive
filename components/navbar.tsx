'use client'
import React from 'react'
import Link from 'next/link'
import { Button } from './ui/button'
import { useSession } from '@/hooks/authentication'
import { useRouter } from 'next/navigation'
import { useTheme } from 'next-themes'
import { ThemeSwitch } from './ui/ThemeSwitch'
import { SearchBar } from './SearchBar'
import { cn } from '@/lib/utils'

export function Navbar() {

    const router = useRouter()


    const userId = useSession((state) => state.userId)
    const signOut = useSession((state) => state.clearSession)

    async function handleSignOut() {
        document.cookie = "jwt= ; expires = Thu, 01 Jan 1970 00:00:00 GMT"
        signOut()
        router.push('/login')
    }

    return (
        <div className='flex static top-0  h-16 items-center px-6 pt-3'>
            <div className='flex lg:gap-28 items-center'>

                <Link className='text-xl' href="/">Free Drive</Link>
            </div>
            <div className='flex ml-auto justify-center items-center gap-6 '>
                <SearchBar className={cn("hidden  ", userId ? "md:flex" : "hidden")} />
                {
                    userId == "" || !userId ? <>
                        <Button className='rounded-full px-6 '> <Link href="/register"  >Register</Link></Button>
                        <Link href="/login" className='' >Login</Link>
                    </>
                        :
                        <Button onClick={handleSignOut} className='rounded-full px-6 '>Sign Out</Button>
                }
                <ThemeSwitch />
            </div>
        </div>
    )
}