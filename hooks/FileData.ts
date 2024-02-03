import { create } from 'zustand'
import { fileArray } from '@/lib/data/dummyData'
import { IconType, deleteFile, getChildren, getFileSystem } from '@/lib/fileSystem'
import { useFileSystem } from './FileSystemState'
import { get } from 'https'


export interface FileSystem {
    [key: string]: FileSystem
}


interface useDataStoreProps {
    FileData: FileSystem,
    addFile: (doc: newDoc) => void
    removeFile: (doc: newDoc) => void
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
    addFile: async (doc) => {
        // update the array
        // const activeDir = useFileSystem.getState().activeDirPath
        // const newKey = activeDir + '/' + doc.name
        // const array = useData.getState().fileArray
        // const data = useData.getState().FileData

        // array.push(newKey)
        // const updatedData = await addFile(newKey, doc.type, data)
        // console.log("new data after updating ")
        // set({ fileArray: array })
        // set({ FileData: updatedData })
    },
    removeFile: (doc) => {
        const activeDir = useFileSystem.getState().activeDirPath
        const key = activeDir + '/' + doc.name
        const array = useData.getState().fileArray
        const data = useData.getState().FileData

        const newArray = array.filter((item) => item !== key)
        const newData = deleteFile(key, data)
        set({ fileArray: newArray })
    },
}))





