import { create } from 'zustand'


interface loadingProps {
    loading: boolean,
    setLoading: (newState: boolean) => void
    beingCreated: string
    setBeingCreated: (name: string) => void

}


export const useLoading = create<loadingProps>((set) => ({
    loading: false,
    beingCreated: '',
    setBeingCreated: (name) => set({ beingCreated: name }),
    setLoading: (newValue) => set({ loading: newValue })
}))