import { create } from 'zustand'
import { getCurDate } from '@/lib/auth/date'
import { FileSystem } from '@/lib/fileSystem'

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
    FileData:
    {
        "children": {
            "home": {
                "children": {},
                "metadata": {
                    "type": "folder",
                    "time": getCurDate(),
                    "size": "donknow"
                }
            },

        },
        "metadata": {
            "type": "folder",
            "time": getCurDate(),
            "size": "donknow"
        }

    },
    fileArray: [],
    loadFileData: (data) => {
        set({ FileData: data })
    },
    loadArray: (userArray) => {
        set({ fileArray: userArray })
    },
}))





