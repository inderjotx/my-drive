import { create } from 'zustand'


interface loadingProps {
    loading: boolean,
    setLoading: (newState: boolean) => void
    beingCreated: string[]
    setBeingCreated: (fileName: string[]) => void

}


export const useLoading = create<loadingProps>((set) => ({
    loading: false,
    beingCreated: [],
    setBeingCreated: (files) => set({ beingCreated: files }),
    setLoading: (newValue) => set({ loading: newValue })
}))