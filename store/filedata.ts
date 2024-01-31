import { create } from 'zustand'
import { fileArray } from '@/lib/data/dummyData'
import { IconType, addFile, deleteFile, getChildren, getFileSystem } from '@/lib/fileSystem'
import { useFileSystem } from './FileSystemState'
import { immer } from 'zustand/middleware/immer'


interface FileSystem {
    [key: string]: FileSystem
}


interface useDataStoreProps {
    fileData: FileSystem,
    addFile: (doc: newDoc) => void
    removeFile: (doc: newDoc) => void
    fileArray: string[],
    curChidren: IconType[] | []
}


export interface newDoc {
    name: string,
    type: string
}





export const useFileData = create<useDataStoreProps>((set) => ({
    fileData: getFileSystem(fileArray),
    fileArray: fileArray,
    curChidren: [],
    addFile: (doc) => {
        // update the array
        const activeDir = useFileSystem.getState().activeDirPath
        const newKey = activeDir + '/' + doc.name
        const array = useFileData.getState().fileArray
        const data = useFileData.getState().fileData

        array.push(newKey)
        const newData = addFile(newKey, data)
        console.log("new data after updating ")
        console.log(newData)
        const newChildren = getChildren(activeDir, newData)
        set({ fileData: newData })
        set({ fileArray: array })
        set({ curChidren: newChildren })
    },
    removeFile: (doc) => {
        const activeDir = useFileSystem.getState().activeDirPath
        const key = activeDir + '/' + doc.name
        const array = useFileData.getState().fileArray
        const data = useFileData.getState().fileData

        const newArray = array.filter((item) => item !== key)
        const newData = deleteFile(key, data)
        const newChildren = getChildren(activeDir, newData)
        set({ fileData: newData })
        set({ fileArray: newArray })
        set({ curChidren: newChildren })
    },
}))





