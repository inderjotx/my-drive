'use client'
import React, { useState } from 'react'
import { FileSystem } from '@/lib/fileSystem'
import { cn } from '@/lib/utils'
import { useFileSystem } from '@/hooks/FileSystemState'
import { Folder, FolderOpen, File } from 'lucide-react'


export function RecursiveFiles({ data }: { data: FileSystem }) {

    const keys = Object.keys(data.children)
    const [showName, setShowName] = useState<string[]>([])
    const setCurDir = useFileSystem((state) => state.updateActiveDir)


    const handleChangeDir = (name: string) => {

        const array = data.children[name].metadata.key.split('/')
        console.log(array)
        const key = array.slice(0, array.length - 1).join('/')
        console.log(key)
        setCurDir(key)

    }

    const toggleFile = (name: string) => {

        if (showName.includes(name)) {
            const index = showName.indexOf(name)
            const array = [...showName.slice(0, index), ...showName.slice(index + 1)]
            setShowName(array)

        }
        else {
            setShowName((prev) => [...prev, name])
        }
    }

    return (

        <>
            {
                keys.map((name) => (

                    <div key={name} className='border-l pl-1 flex flex-col overflow-hidden' >
                        {
                            data.children[name].metadata.type === "folder"
                                ?
                                <div className='flex flex-col  mt-2'>
                                    <div onClick={() => toggleFile(name)}
                                        className='h-10 cursor-pointer w-full flex items-center bg-foreground/5 hover:bg-foreground/10 rounded-sm animate-accordion-down ' >
                                        {
                                            showName.includes(name) ?

                                                <FolderOpen className='ml-2 h-4 w-4'></FolderOpen>
                                                :
                                                <Folder className='ml-2 h-4 w-4'></Folder>
                                        }
                                        <span className='ml-2 text-sm' >{name.substring(0, 10)}</span>
                                    </div>
                                    <div className={cn("hidden pl-2", showName.includes(name) && "block")}>
                                        <RecursiveFiles data={data.children[name]} />
                                    </div>
                                </div>
                                :
                                <div onClick={() => handleChangeDir(name)} className='flex gap-2 items-center  h-10 p-2 whitespace-nowrap rounded-sm bg-foreground/5 mt-2 hover:bg-foreground/10 cursor-pointer '>
                                    <File className='w-4 h-4 flex-none' ></File>
                                    <span className='text-sm' >{name}</span>
                                </div>
                        }
                    </div>
                ))
            }
        </>
    )
}
