import { useCreateDoc } from '@/hooks/CreateForm'
import { Plus } from 'lucide-react'
import React from 'react'



function Create() {

    const setOpen = useCreateDoc((state) => state.setIsOpen)

    return (
        <div onClick={() => setOpen(true)} className='h-40 w-32  flex justify-end items-center cursor-pointer'>
            <div className='p-10  h-32 w-28 transition-colors rounded-lg border-2 border-muted-foreground hover:border-foreground border-dashed flex items-center justify-center '>
                <Plus size={40} />
            </div>
        </div>

    )
}

export default Create