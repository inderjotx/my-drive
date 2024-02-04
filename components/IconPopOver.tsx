'use client'
import {
    ContextMenu,
    ContextMenuContent,
    ContextMenuItem,
    ContextMenuTrigger,
} from "@/components/ui/context-menu"
import { deleteDoc } from "@/lib/fileSystem"
import { cn } from "@/lib/utils"
import { useState } from "react"


export const IconPopOver = ({ fileName, children }: { fileName: string, children: React.ReactNode }) => {


    const [isDeleting, setDeleting] = useState<boolean>(false)

    async function handleDelete() {
        setDeleting(true)
        console.log("delete")
        await deleteDoc(fileName)
        setDeleting(false)
    }

    function handleOpen() {
        console.log("open")
    }

    return (
        <ContextMenu>
            <ContextMenuTrigger><div className={cn(isDeleting && "animate-pulse duration-1000 bg-red-200 rounded-2xl")}>{children}</div></ContextMenuTrigger>
            <ContextMenuContent >
                <ContextMenuItem onSelect={handleOpen} >Open</ContextMenuItem>
                <ContextMenuItem onSelect={handleDelete} >Delete</ContextMenuItem>
                <ContextMenuItem>Share</ContextMenuItem>
            </ContextMenuContent>
        </ContextMenu>

    )
}