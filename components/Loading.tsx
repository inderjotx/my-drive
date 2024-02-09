import React from 'react'
import { Alert, AlertTitle } from "@/components/ui/alert"
import { Database, Server } from 'lucide-react'


export function SpaceLeft({ left }: { left: number }) {


    const percentage = (left / (1024 * 1024 * 1024)) * 100
    // const percentage = 22.22


    return (
        <Alert className='w-full flex flex-col gap-6'>
            <Server className="h-4 w-4" />
            <AlertTitle>Free Space Left</AlertTitle>
            <div className='h-1 w-full relative bg-foreground/10 rounded-full'>
                <div className='h-1 w-1/2 absolute left-0 bg-foreground rounded-full' style={{ width: `${percentage}%` }}  >
                </div>
            </div>
        </Alert>
    )
}
