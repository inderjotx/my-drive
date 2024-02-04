'use client'

import React, { useEffect, useState } from 'react'
import FileTree from './FileTree'
import { useFileSystem } from '@/hooks/FileSystemState'
import { IconType, getChildren } from '@/lib/fileSystem'
import { Icon } from './Icon'
import BreakCrums from './BreakCrums'
import Create from './Create'
import { useData } from '@/hooks/FileData'
import { IconPopOver } from './IconPopOver'

function Directory() {

    const activeDir = useFileSystem((state) => state.activeDirPath)
    const [curDirChild, setCurDirChild] = useState<IconType[] | []>([])
    const data = useData((state) => state.FileData)
    // const children = useData((state) => state.curChidren)
    console.log("inside the dirctory")
    console.log(data)

    useEffect(() => {

        const children = getChildren(activeDir, data)
        console.log(children)
        setCurDirChild(children)

    }, [activeDir, data])




    return (
        <div className='w-full h-full grid grid-cols-8'>
            <div className='col-span-2  lg:col-span-1 border-r mt-12'>
                <FileTree />
            </div>
            <div className='h-full w-full col-span-6  lg:col-span-7 px-6 pt-4 flex flex-col '>

                <div className='w-full h-20 '>
                    <BreakCrums />
                </div>
                <div className='flex gap-8 w-full flex-wrap items-start'>
                    <Create />
                    {
                        curDirChild.map((item: IconType, index: number) => {
                            return (
                                <IconPopOver key={item.key} fileName={item.key}>
                                    <Icon icon={item} />
                                </IconPopOver>
                            )
                        })
                    }
                </div>
            </div>
        </div>
    )
}

export default Directory