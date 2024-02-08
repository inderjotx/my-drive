"use client"

import { Checkbox } from "@/components/ui/checkbox"
import { SetStateAction } from "react"

export function CheckBox({ setIsMultiUpload, checked }: { setIsMultiUpload: React.Dispatch<SetStateAction<boolean>>, checked: boolean }) {

    function handleChange(value: boolean) {
        setIsMultiUpload(value)
    }

    return (
        <div className="flex items-center space-x-2">
            <Checkbox id="terms" checked={checked} onCheckedChange={handleChange} />
            <label
                htmlFor="terms"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
                MultiUpload
            </label>
        </div>
    )
}
