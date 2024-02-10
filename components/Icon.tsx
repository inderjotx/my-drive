"use client"
import { IconType } from "@/lib/fileSystem"
import { getPresignedUrl } from "@/lib/storeToS3"
import { useFileSystem } from "@/hooks/FileSystemState"
import axios from "axios"
import { Folder, File, FileVideo, FileText, } from "lucide-react"
import { useRouter } from "next/navigation"
import { useLoading } from "@/hooks/loadinghoo"
import { cn } from "@/lib/utils"
import { useShowVideo } from "@/hooks/ShowVideo"

interface IconProps {
    icon: IconType
}



export const getUrl = async (key: string, duration = 3600) => {

    const { data: { url } } = await axios.post('/api/get-url', {
        key: key,
        duration: duration,
        method: "get"
    })

    return url
}




export const Icon = ({ icon }: IconProps) => {
    const update = useFileSystem((state) => state.updateActiveDir)

    const route = useRouter()
    const loading = useLoading((state) => state.loading)
    const beingCreated = useLoading((state) => state.beingCreated)
    const { show, setShow, setUrl, setType } = useShowVideo(state => state)


    const downloadFile = async (key: string) => {

        if (loading && beingCreated.includes(icon.key)) return;


        const url = await getUrl(key)


        if (!url) {
            console.log("No valid url ")
        }

        // window.location.href = url
        route.push(url)

    }


    const handleMedia = async (key: string) => {

        if (loading && beingCreated.includes(icon.key)) return;
        const url = await getUrl(key)
        setShow(true)
        setType(icon.type)
        setUrl(url)
        console.log(url)
    }

    console.log(beingCreated)
    console.log(icon.key)
    console.log(beingCreated.includes(icon.key))

    return (
        <div className={cn("h-40 cursor-pointer   ", loading && beingCreated.includes(icon.key) && "hover:cursor-not-allowed animate-pulse duration-1000 bg-foreground/5  rounded-2xl")}>
            {
                icon.type == "folder" &&
                <div className="flex  flex-col px-6 rounded-2xl hover:bg-foreground/5 w-full h-full   justify-center items-center" onClick={() => update(icon.key)} >
                    <Folder className="h-20 w-20" />
                    <p>{`${icon.name.slice(0, 12)}${(icon.name.length > 12) ? "..." : ""}`}</p>


                </div>
            }
            {
                (icon.type.includes("file") || icon.type.includes("image")) &&
                <div onClick={() => handleMedia(icon.key)} className={cn("flex flex-col w-full h-full px-6 rounded-2xl hover:bg-foreground/5 justify-center items-center")} >
                    <File className="h-20 w-20 " />
                    <p>{`${icon.name.slice(0, 12)}${(icon.name.length > 12) ? "..." : ""}`}</p>
                </div>
            }

            {
                icon.type.includes("video") &&
                <div onClick={() => handleMedia(icon.key)} className={cn("flex flex-col w-full h-full px-6 rounded-2xl hover:bg-foreground/5 justify-center items-center")} >
                    <FileVideo className="h-20 w-20 " />
                    <p>{`${icon.name.slice(0, 12)}${(icon.name.length > 12) ? "..." : ""}`}</p>
                </div>
            }

            {
                icon.type.includes("pdf") &&
                <div onClick={() => downloadFile(icon.key)} className={cn("flex flex-col w-full h-full px-6 rounded-2xl hover:bg-foreground/5 justify-center items-center")} >
                    <FileText className="h-20 w-20 " />
                    <p>{`${icon.name.slice(0, 12)}${(icon.name.length > 12) ? "..." : ""}`}</p>
                </div>
            }
        </div>
    )

}