import { create } from 'zustand'
import { getFileSystem } from '@/lib/fileSystem'


export interface FileSystem {
    [key: string]: FileSystem
}


interface useDataStoreProps {
    FileData: FileSystem,
    fileArray: string[] | any[],
    loadArray: (array: string[] | []) => void
    loadFileData: (FileData: FileSystem) => void
}


export interface newDoc {
    name: string,
    type: string
}




export const useData = create<useDataStoreProps>((set) => ({
    FileData: {},
    fileArray: [],
    loadFileData: (data) => {
        set({ FileData: data })
    },
    loadArray: (userArray) => {
        set({ fileArray: userArray })
        const data = getFileSystem(userArray)
        console.log('[LOAD_ARRAY_FUNCTION_FILE_DATA DATA AFTER ADDING USER: 37]')
        console.log(data)
        set({ FileData: data })
    },
}))





