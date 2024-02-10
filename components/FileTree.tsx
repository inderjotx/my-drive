'use client'
import React from 'react'
import { SpaceLeft } from './Loading'
import { useSession } from '@/hooks/authentication'
const MainFolders = [
    'Home',
    'Images',
    'Videos',

]

function FileTree() {

    const left = useSession((state) => state.spaceLeft)

    return (
        <div className='w-full h-full  '>
            <div className='flex flex-col mx-2 '>
                <SpaceLeft left={left} />
                {
                    MainFolders.map((name: string, index: number) => (
                        <div key={index} className='w-full h-10 flex items-center  text-left rounded-md  hover:bg-foreground/5 cursor-pointer '>
                            <div className='p-2'>{name}</div>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}

export default FileTree