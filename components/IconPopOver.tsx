'use client'
import {
    ContextMenu,
    ContextMenuContent,
    ContextMenuItem,
    ContextMenuTrigger,
} from "@/components/ui/context-menu"
import { useLoading } from "@/hooks/loadinghoo"
import { deleteDoc } from "@/lib/fileSystem"
import { cn } from "@/lib/utils"
import { useState } from "react"


export const IconPopOver = ({ fileName, children }: { fileName: string, children: React.ReactNode }) => {


    const [isDeleting, setDeleting] = useState<boolean>(false)
    const loading = useLoading((state) => state.loading)
    const beingCreated = useLoading((state) => state.beingCreated)

    async function handleDelete() {
        setDeleting(true)
        console.log("delete")
        await deleteDoc(fileName)
        setDeleting(false)
    }

    function handleOpen() {
        console.log("open")
    }
    // loading && "animate-pulse duration-1000 bg-emerald-200 rounded-2x
    return (
        <ContextMenu>
            <ContextMenuTrigger><div className={cn("", isDeleting && "bg-foreground/5 animate-pulse duration-1000 rounded-2xl cursor-not-allowed", ((beingCreated === fileName) && loading) && "animate-pulse duration-1000 bg-foreground/5  rounded-2xl")}>{children}</div></ContextMenuTrigger>
            <ContextMenuContent >
                <ContextMenuItem onSelect={handleOpen} >Open</ContextMenuItem>
                <ContextMenuItem onSelect={handleDelete} >Delete</ContextMenuItem>
                <ContextMenuItem>Share</ContextMenuItem>
            </ContextMenuContent>
        </ContextMenu>

    )
}