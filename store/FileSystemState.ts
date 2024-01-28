import { create } from 'zustand'

interface fileSystemProps {
    activeDirPath: string,
    updateActiveDir: (newPath: string) => void
}


export const useFileSystem = create<fileSystemProps>((set) => (
    {
        activeDirPath: '/root',
        updateActiveDir: (newPath) => set({ activeDirPath: newPath })
    }
))
