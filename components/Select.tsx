import * as React from "react"

import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { useCreateDoc } from "@/hooks/CreateForm"

export function SelectType() {
    const setType = useCreateDoc((state) => state.setType)

    return (
        <Select defaultValue="file" onValueChange={setType} >
            <SelectTrigger className="w-[278px]">
                <SelectValue placeholder="Select type of document" />
            </SelectTrigger>
            <SelectContent>
                <SelectGroup >
                    <SelectLabel>Type</SelectLabel>
                    <SelectItem defaultValue={'file'} value="file">File</SelectItem>
                    <SelectItem value="folder">Folder</SelectItem>
                </SelectGroup>
            </SelectContent>
        </Select>
    )
}
