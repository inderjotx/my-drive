import React from 'react'

const MainFolders = [
    'Home',
    'Images',
    'Videos',

]

function FileTree() {
    return (
        <div className='w-full h-full  '>
            <div className='flex flex-col mx-2 '>
                {
                    MainFolders.map((name: string, index: number) => (
                        <div key={index} className='w-full h-10 flex items-center  text-left rounded-md  hover:bg-zinc-900 cursor-pointer '>
                            <div className='p-2'>{name}</div>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}

export default FileTree