'use client'

import Image from 'next/image'
import {
    Dialog,
    DialogContent,
} from "@/components/ui/dialog"
import { useShowVideo } from "@/hooks/ShowVideo"

export function VideoProvider() {

    const { show, setShow, url, key, type } = useShowVideo(state => state)




    return (
        <Dialog open={show} onOpenChange={setShow} >
            {
                type.includes("video") &&
                <DialogContent className="max-w-[800px] max-h-[800px] ">
                    <video width="400" height="240" className="w-full h-full" controls autoPlay >
                        <source src={url} type="video/mp4" />
                    </video>

                </DialogContent>
            }
            {
                (type.includes("file") || type.includes("image")) &&
                <DialogContent className="max-w-[800px] max-h-[800px] h-[400px] w-[600px] p-0 overflow-hidden ">
                    <div className=' flex items-center justify-center overflow-hidden relative '>
                        <Image src={url} fill alt='image' loading='eager' priority={true} sizes='' objectFit='cover' className='absolute' />
                    </div>
                </DialogContent>
            }
        </Dialog >
    )
}

