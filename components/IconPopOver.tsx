'use client'
import {
    ContextMenu,
    ContextMenuContent,
    ContextMenuItem,
    ContextMenuSeparator,
    ContextMenuSub,
    ContextMenuSubContent,
    ContextMenuSubTrigger,
    ContextMenuTrigger,
} from "@/components/ui/context-menu"
import { useShowVideo } from "@/hooks/ShowVideo"
import { useLoading } from "@/hooks/loadinghoo"
import { deleteDoc } from "@/lib/fileSystem"
import { cn } from "@/lib/utils"
import { useState } from "react"
import { getUrl } from "./Icon"
import { getPresignedUrl } from "@/lib/storeToS3"
import toast from "react-hot-toast"


export const IconPopOver = ({ fileName, children }: { fileName: string, children: React.ReactNode }) => {


    const [isDeleting, setDeleting] = useState<boolean>(false)
    const loading = useLoading((state) => state.loading)
    const beingCreated = useLoading((state) => state.beingCreated)
    const { show, setShow, setUrl, setType } = useShowVideo(state => state)


    const handleMedia = async () => {

        const url = await getUrl(fileName)
        setShow(true)
        setType(fileName)
        setUrl(url)
        console.log(url)
    }


    const copyUrl = async (duration: number) => {

        const url: string = await getPresignedUrl(fileName, 'get', duration)
        console.log("called")
        navigator.clipboard.writeText(url)
        toast.success("URL Copied")

    }




    async function handleDelete() {
        setDeleting(true)
        console.log("delete")
        await deleteDoc(fileName)
        setDeleting(false)
    }

    // loading && "animate-pulse duration-1000 bg-emerald-200 rounded-2x
    return (
        <ContextMenu>
            <ContextMenuTrigger><div className={cn("", isDeleting && "bg-foreground/5 animate-pulse duration-1000 rounded-2xl cursor-not-allowed", ((beingCreated.includes(fileName)) && loading) && "animate-pulse duration-1000 bg-foreground/5  rounded-2xl")}>{children}</div></ContextMenuTrigger>
            <ContextMenuContent >
                <ContextMenuItem onSelect={handleMedia} >Open</ContextMenuItem>
                <ContextMenuItem onSelect={handleDelete} >Delete</ContextMenuItem>
                <ContextMenuSub>
                    <ContextMenuSubTrigger >Share Url</ContextMenuSubTrigger>
                    <ContextMenuSubContent className="w-20">
                        <ContextMenuItem onClick={() => copyUrl(60 * 60)} ><span onClick={() => { copyUrl(60 * 60) }} >One Day </span> </ContextMenuItem>
                        <ContextMenuItem onSelect={() => copyUrl(60 * 60 * 24)}>One Day</ContextMenuItem>
                        <ContextMenuItem onSelect={() => copyUrl(60 * 60 * 24 * 7)} >One Week</ContextMenuItem>
                    </ContextMenuSubContent>
                </ContextMenuSub>
            </ContextMenuContent>
        </ContextMenu>

    )
}