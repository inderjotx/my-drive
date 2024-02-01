'use client'
import React from 'react'
import { ThemeSwitch } from './providers/ThemeSwitch'
import Link from 'next/link'
import { Button } from './ui/button'
import { useSession } from '@/store/authentication'
import axios from 'axios'

export function Navbar() {

    const userId = useSession((state) => state.userId)
    const signOut = useSession((state) => state.clearSession)

    async function handleSignOut() {

        // signOut()
        await axios.get('/api/sign-out')

    }

    return (
        <div className='flex static top-0  h-16 items-center px-6 pt-3  justify-between'>
            <Link href="/">Free Drive</Link>
            <div className='flex justify-center items-center gap-6 '>
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