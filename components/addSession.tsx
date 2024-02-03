'use client'
import { useSession } from '@/store/authentication'
import { useFileData } from '@/store/filedata'
import React from 'react'
import { FileSystem } from '@/store/filedata'

export function SetSession({ name, email, userId, fileArray, fileData }: { name: string, email: string, userId: string, fileArray: string[], fileData: FileSystem }) {

    const setSession = useSession.getState().setSession
    setSession(name, email, userId)

    const loadArray = useFileData.getState().loadArray
    const loadFileData = useFileData.getState().loadFileData
    loadArray(fileArray)
    loadFileData(fileData)



    return (
        <></>
    )
}
