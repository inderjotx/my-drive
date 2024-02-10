import React from 'react'
import { Alert, AlertTitle } from "@/components/ui/alert"
import { Server } from 'lucide-react'


export function SpaceLeft({ left }: { left: number }) {


    let percentage = (left / (1024 * 1024 * 1024)) * 100

    // console.log(percentage)
    // if (percentage > 100) {
    //     percentage = 100
    // }



    return (
        <Alert className='w-full flex flex-col gap-6'>
            <Server className="h-4 w-4" />
            <AlertTitle>Free Space Left</AlertTitle>
            <div>{percentage.toFixed(1)}% of 1 GB Left</div>
            <div className='h-1 w-full relative bg-foreground/10 rounded-full'>
                <div className='h-1 w-1/2 absolute left-0 bg-foreground rounded-full' style={{ width: `${percentage}%` }}  >
                </div>
            </div>
        </Alert>
    )
}
