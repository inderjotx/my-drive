'use client'

import React, { useEffect, useState } from 'react'
import FileTree from './FileTree'
import { useFileSystem } from '@/store/FileSystemState'
import { IconType, getChildren } from '@/lib/fileSystem'
import { fileTreeData } from '@/lib/data/dummyData'
import { Icon } from './Icon'

function Directory() {

    const activeDir = useFileSystem((state) => state.activeDirPath)
    const [curDirChild, setCurDirChild] = useState<IconType[] | []>([])

    useEffect(() => {

        const children = getChildren(activeDir, fileTreeData)
        console.log(children)
        setCurDirChild(children)

    }, [activeDir])




    return (
        <div className='w-full h-full grid grid-cols-8'>
            <div className='h-screen col-span-2 md:col-span-2  lg:col-span-1 border-r mt-12'>
                <FileTree />
            </div>
            <div className='h- p-16 flex flex-wrap'>
                {
                    curDirChild.map((item: IconType, index: number) => {
                        return <Icon icon={item} key={index} />
                    })
                }
            </div>
        </div>
    )
}

export default Directory