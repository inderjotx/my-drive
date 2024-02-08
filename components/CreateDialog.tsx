'use client'

import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useCreateDoc } from "@/hooks/CreateForm"
import { SelectType } from "./Select"
import { createDoc } from "@/lib/fileSystem"
import { useLoading } from "@/hooks/loadinghoo"
import { useState } from "react"
import { CakeIcon } from "lucide-react"
import { CheckBox } from "./Checkbox"
import Dropzone from "react-dropzone"
import { cn } from "@/lib/utils"
import { MyDropZone } from "./DropZone"

export function CreateDoc() {

    const { isOpen, setIsOpen, docName, setDocName, setAttachement, type, setType } = useCreateDoc(state => state)
    const [multiUpload, setMultiUpload] = useState<boolean>(false)

    const setLoading = useLoading((state) => state.setLoading)

    async function createFile() {

        setLoading(true)
        await createDoc()
        setLoading(false)
    }


    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen} >
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Create </DialogTitle>
                    <DialogDescription >
                        Create File or Folder
                    </DialogDescription>
                </DialogHeader>
                <div className="text-right">
                    <CheckBox checked={multiUpload} setIsMultiUpload={setMultiUpload} />
                </div>
                <div className={cn("h-[225px] w-full ", !multiUpload && "hidden")}>
                    <MyDropZone onUpload={() => { }} />
                </div>
                <div className={cn("grid gap-4 py-4", multiUpload && "hidden")}>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="name" className="text-right">
                            File
                        </Label>
                        <Input
                            id="name"
                            type="file"
                            disabled={type == "folder"}
                            // @ts-ignore
                            onChange={(e) => { setAttachement(e.target.files?.[0]); setDocName(e.target.files?.[0].name); setType(e.target.files?.[0].type); console.log(e.target.files?.[0].type) }}
                            className="col-span-3"
                        />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="name" className="text-right">
                            Name
                        </Label>
                        <Input
                            id="name"
                            value={docName}
                            onChange={(e) => setDocName(e.target.value)}
                            className="col-span-3"
                        />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="username" className="text-right">
                            Type
                        </Label>
                        <SelectType />
                    </div>
                </div>
                <DialogFooter>
                    <Button type="button" onClick={createFile} >
                        Create
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog >
    )
}
