'use client'
import { useSession } from '@/hooks/authentication'
import { useData } from '@/hooks/FileData'
import React from 'react'
import { FileSystem } from "@/lib/fileSystem"
export function SetSession({ name, email, userId, fileArray, FileData, spaceLeft }: { spaceLeft: number, name: string, email: string, userId: string, fileArray: string[], FileData: FileSystem }) {

    const setSession = useSession.getState().setSession
    setSession(name, email, userId, spaceLeft)

    const loadArray = useData.getState().loadArray
    const loadFileData = useData.getState().loadFileData
    loadArray(fileArray)
    console.log(FileData)
    loadFileData(FileData)



    return (
        <></>
    )
}
