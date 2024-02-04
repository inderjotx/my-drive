"use client"
import { IconType } from "@/lib/fileSystem"
import { getPresignedUrl } from "@/lib/storeToS3"
import { useFileSystem } from "@/hooks/FileSystemState"
import axios from "axios"
import { Folder, File, Layout } from "lucide-react"
import { useRouter } from "next/navigation"
import { useLoading } from "@/hooks/loadinghoo"

interface IconProps {
    icon: IconType
}


export const Icon = ({ icon }: IconProps) => {
    const update = useFileSystem((state) => state.updateActiveDir)

    const route = useRouter()
    // const loading = useLoading((state) => state.loading)

    const downloadFile = async (key: string) => {

        // if (loading) return null

        const { data: { url } } = await axios.post('/api/get-url', {
            key: key,
            method: "get"
        })


        if (!url) {
            console.log("No valid url ")
        }


        // window.location.href = url
        route.push(url)

    }


    return (
        <div className="h-40  cursor-pointer ">
            {
                icon.type == "folder" ?
                    <div className="flex flex-col px-6 rounded-2xl hover:bg-foreground/5 w-full h-full   justify-center items-center" onClick={() => update(icon.key)} >
                        <Folder className="h-20 w-20" />
                        <p>{icon.name}</p>


                    </div>
                    :

                    <div onClick={() => downloadFile(icon.key)} className="flex flex-col w-full h-full px-6 rounded-2xl hover:bg-foreground/5  justify-center items-center" >
                        <File className="h-20 w-20 " />
                        <p>{icon.name}</p>
                    </div>

            }
        </div>
    )

}