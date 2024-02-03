'use client'
import { cn } from '@/lib/utils'
import { useFileSystem } from '@/hooks/FileSystemState'
import { ChevronRight } from 'lucide-react'
import React from 'react'
import { Button } from './ui/button'

function BreakCrums() {
    const curDir = useFileSystem((state) => state.activeDirPath)
    const update = useFileSystem((state) => state.updateActiveDir)


    const fileArray = curDir.split('/').slice(1)


    function updateActiveDir(index: number) {

        const array = fileArray.slice(0, index + 1)
        const activeDir = '/' + array.join('/')
        update(activeDir)

    }



    return (
        <div className='w-full h-full flex items-center  group'>
            {
                fileArray.map((item: string, index: number) => (
                    <div className='flex items-center ' key={index}>
                        <div className='cursor-pointer transition-colors text-muted-foreground hover:text-foreground rounded-sm text-lg px-2 capitalize' onClick={() => updateActiveDir(index)} key={index} >
                            {item}
                        </div>
                        <ChevronRight size={25} className={cn('h-full w-full', index == fileArray.length - 1 && "hidden")} />
                    </div>
                ))
            }

        </div>
    )
}

export default BreakCrums