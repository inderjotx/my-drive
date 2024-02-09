import { create } from 'zustand'


interface UserProps {
    name: string | null,
    email: string | null,
    userId: string | null,
    spaceLeft: number,
    setSpaceLeft: (left: number) => void
    setSession: (name: string, email: string, userId: string, spaceLeft: number) => void,
    clearSession: () => void
}


export const useSession = create<UserProps>((set) => ({
    name: null,
    email: null,
    userId: null,
    spaceLeft: 0,
    setSpaceLeft: (left) => set({ spaceLeft: left }),
    setSession: (name, email, userId, spaceLeft) => set({ name: name, email: email, userId: userId, spaceLeft: spaceLeft }),
    clearSession: () => set({ name: null, email: null, userId: null })

})) 