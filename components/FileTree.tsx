'use client'
import React from 'react'
import { SpaceLeft } from './Loading'
import { useSession } from '@/hooks/authentication'
import { useData } from '@/hooks/FileData'
import { RecursiveFiles } from './RecursiveFiles'
const MainFolders = [
    'Home',
    'Images',
    'Videos',

]

function FileTree() {

    const left = useSession((state) => state.spaceLeft)
    const data = useData((state) => state.FileData)

    return (
        <div className='w-full h-full  '>
            <div className='flex flex-col mx-2 gap-2 '>
                <SpaceLeft left={left} />
                <div className=''>
                    <RecursiveFiles data={data} />
                </div>
            </div>
        </div>
    )
}

export default FileTree