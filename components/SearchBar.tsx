'use client'

import React, { useEffect, useState } from 'react'
import { Input } from './ui/input'
import { useData } from '@/hooks/FileData'
import { Check, ChevronsUpDown } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
} from "@/components/ui/command"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { useFileSystem } from '@/hooks/FileSystemState'


type SearchResultProps = { "value": string, label: string }[]



export function SearchBar() {

    const [searchData, setStateData] = useState<string>("")
    const dataArray = useData((state) => state.fileArray)
    const [searchResults, setSearchResults] = useState<SearchResultProps>([])
    const [open, setOpen] = useState<boolean>(false)
    const updateActiveDir = useFileSystem((state) => state.updateActiveDir)

    useEffect(() => {

        const newResult: SearchResultProps = []
        dataArray.forEach((path: string) => {
            if (path.toLocaleLowerCase().includes(searchData.toLocaleLowerCase())) {
                newResult.push({ value: path, label: path.split('/').pop() as string })
            }
        }
        )
        setSearchResults((prev) => newResult)
    }, [searchData, dataArray])




    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={open}
                    className="w-[300px] justify-between"
                >
                    Search
                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[300px] p-0">
                <Command>
                    <CommandInput placeholder="Search framework..." />
                    <CommandEmpty>No File Found</CommandEmpty>
                    <CommandGroup>
                        {searchResults.map((result) => (
                            <CommandItem
                                key={result.value}
                                value={result.value}
                                onSelect={(currentValue) => {
                                    const data = result.value.split('/')
                                    const dir = data.splice(0, data.length - 1).join('/')
                                    updateActiveDir(dir)
                                    setOpen(false)
                                }}
                            >
                                {result.label}
                            </CommandItem>
                        ))}
                    </CommandGroup>
                </Command>
            </PopoverContent>
        </Popover>
    )
}




