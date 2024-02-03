import { create } from 'zustand'
import { fileArray } from '@/lib/data/dummyData'
import { IconType, addFile, deleteFile, getChildren, getFileSystem } from '@/lib/fileSystem'
import { useFileSystem } from './FileSystemState'
import { get } from 'https'


export interface FileSystem {
    [key: string]: FileSystem
}


interface useDataStoreProps {
    fileData: FileSystem,
    addFile: (doc: newDoc) => void
    removeFile: (doc: newDoc) => void
    fileArray: string[] | any[],
    loadArray: (array: string[] | []) => void
    loadFileData: (fileData: FileSystem) => void
}


export interface newDoc {
    name: string,
    type: string
}




export const useFileData = create<useDataStoreProps>((set) => ({
    fileData: {},
    fileArray: [],
    loadFileData: (data) => {
        set({ fileData: data })
    },
    loadArray: (userArray) => {
        set({ fileArray: userArray })
        const data = getFileSystem(userArray)
        console.log('[LOAD_ARRAY_FUNCTION_FILE_DATA DATA AFTER ADDING USER: 37]')
        console.log(data)
        set({ fileData: data })
    },
    addFile: async (doc) => {
        // update the array
        const activeDir = useFileSystem.getState().activeDirPath
        const newKey = activeDir + '/' + doc.name
        const array = useFileData.getState().fileArray
        const data = useFileData.getState().fileData

        array.push(newKey)
        const updatedData = await addFile(newKey, doc.type, data)
        console.log("new data after updating ")
        set({ fileArray: array })
        set({ fileData: updatedData })
    },
    removeFile: (doc) => {
        const activeDir = useFileSystem.getState().activeDirPath
        const key = activeDir + '/' + doc.name
        const array = useFileData.getState().fileArray
        const data = useFileData.getState().fileData

        const newArray = array.filter((item) => item !== key)
        const newData = deleteFile(key, data)
        set({ fileArray: newArray })
    },
}))





