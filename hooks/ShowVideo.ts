import { create } from "zustand";



// url 
// name
// key
// show 
// not show 


interface VideoPlayProps {
    url: string,
    type: string,
    setType: (type: string) => void
    setUrl: (url: string) => void
    key: string,
    show: boolean,
    setShow: (state: boolean) => void
}



export const useShowVideo = create<VideoPlayProps>((set) => ({
    url: "",
    key: "",
    show: false,
    type: "",
    setShow: (state) => set({ show: state }),
    setType: (state) => set({ type: state }),
    setUrl: (state) => set({ url: state })
}))
