'use client'
import { useSession } from '@/store/authentication'
import React from 'react'


export function SetSession({ name, email, userId }: { name: string, email: string, userId: string }) {

    const setSession = useSession((state) => state.setSession)

    setSession(name, email, userId)

    return (
        <></>
    )
}
