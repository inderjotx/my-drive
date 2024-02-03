import { create } from 'zustand'


interface loadingProps {
    loading: boolean,
    setLoading: (newState: boolean) => void

}


export const useLoading = create<loadingProps>((set) => ({
    loading: false,
    setLoading: (newValue) => set({ loading: newValue })
}))