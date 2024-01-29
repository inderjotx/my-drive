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
import { UserCheck } from "lucide-react"
import { useCreateDoc } from "@/store/CreateForm"

export function SelectType() {
    const setType = useCreateDoc((state) => state.setType)

    return (
        <Select onValueChange={setType} >
            <SelectTrigger className="w-[278px]">
                <SelectValue placeholder="Select a fruit" />
            </SelectTrigger>
            <SelectContent>
                <SelectGroup >
                    <SelectLabel>Type</SelectLabel>
                    <SelectItem value="file">File</SelectItem>
                    <SelectItem value="folder">Folder</SelectItem>
                </SelectGroup>
            </SelectContent>
        </Select>
    )
}
