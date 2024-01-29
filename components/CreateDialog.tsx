'use client'

import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useCreateDoc } from "@/store/CreateForm"
import { Select } from "./ui/select"
import { SelectType } from "./Select"
import { createDoc } from "@/lib/fileSystem"

export function CreateDoc() {

    const { isOpen, setIsOpen, docName, setDocName, setAttachement } = useCreateDoc(state => state)



    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen} >
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Create </DialogTitle>
                    <DialogDescription>
                        Create File or Folder
                    </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
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
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="name" className="text-right">
                            File
                        </Label>
                        <Input
                            id="name"
                            type="file"
                            // @ts-ignore
                            onChange={(e) => setAttachement(e.target.files?.[0])}
                            className="col-span-3"
                        />
                    </div>
                </div>
                <DialogFooter>
                    <Button type="button" onClick={createDoc} >Create</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
