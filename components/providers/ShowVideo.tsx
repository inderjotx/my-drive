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
                type.includes("file") &&
                <DialogContent className="max-w-[800px] max-h-[800px] h-[400px] w-[600px] p-4">
                    <div className=' flex items-center justify-center '>
                        <Image src={url} fill alt='image' sizes='' quality={100} objectFit='cover' className='' />
                    </div>
                </DialogContent>
            }
        </Dialog >
    )
}

