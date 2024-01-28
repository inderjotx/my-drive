import { IconType } from "@/lib/fileSystem"
import { useFileSystem } from "@/store/FileSystemState"
import { Folder, File } from "lucide-react"

interface IconProps {
    icon: IconType
}


export const Icon = ({ icon }: IconProps) => {
    const update = useFileSystem((state) => state.updateActiveDir)
    return (
        <div className="h-30 w-20 cursor-pointer">
            {
                icon.type == "folder" ?
                    <div className="flex flex-col w-full h-full  space-y-2 justify-center items-center" onClick={() => update(icon.key)} >

                        <Folder className="h-20 w-20" />
                        <p>{icon.name}</p>


                    </div>
                    :

                    <div className="flex flex-col w-full h-full  space-y-2 justify-center items-center" >
                        <File className="h-20 w-20" />
                        <p>{icon.name}</p>
                    </div>

            }
        </div>
    )

}