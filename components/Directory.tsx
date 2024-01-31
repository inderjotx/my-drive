'use client'

import React, { useEffect, useState } from 'react'
import FileTree from './FileTree'
import { useFileSystem } from '@/store/FileSystemState'
import { IconType, getChildren } from '@/lib/fileSystem'
import { Icon } from './Icon'
import BreakCrums from './BreakCrums'
import Create from './Create'
import { useFileData } from '@/store/filedata'

function Directory() {

    const activeDir = useFileSystem((state) => state.activeDirPath)
    const [curDirChild, setCurDirChild] = useState<IconType[] | []>([])
    const data = useFileData((state) => state.fileData)
    const addFile = useFileData((state) => state.addFile)
    // const children = useFileData((state) => state.curChidren)
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
                            return <Icon icon={item} key={index} />
                        })
                    }
                </div>
            </div>
        </div>
    )
}

export default Directory