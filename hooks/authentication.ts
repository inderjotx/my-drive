import { create } from 'zustand'


interface UserProps {
    name: string | null,
    email: string | null,
    userId: string | null,
    setSession: (name: string, email: string, userId: string) => void,
    clearSession: () => void
}


export const useSession = create<UserProps>((set) => ({
    name: null,
    email: null,
    userId: null,
    setSession: (name, email, userId) => set({ name: name, email: email, userId: userId }),
    clearSession: () => set({ name: null, email: null, userId: null })

})) 