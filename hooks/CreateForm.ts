import { create } from 'zustand'

interface CreateFormProps {
    isOpen: boolean,
    setIsOpen: (state: boolean) => void,

    docName: string,
    setDocName: (name: string) => void,

    type: string,
    setType: (type: string) => void,

    attachment: File | null,
    setAttachement: (newFile: File) => void
}


export const useCreateDoc = create<CreateFormProps>((set) => (
    {
        isOpen: false,
        setIsOpen: (newValue) => set({ isOpen: newValue }),
        docName: "",
        setDocName: (newValue) => set({ docName: newValue }),
        type: "",
        setType: (newValue) => set({ type: newValue }),
        attachment: null,
        setAttachement: (newValue) => set({ attachment: newValue }),
    }

))
