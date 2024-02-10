import { useCallback, useState } from 'react';
import { useDropzone, FileRejection } from 'react-dropzone';
import { ScrollArea } from './ui/scroll-area';
import { Separator } from './ui/separator';
import { Trash, X } from 'lucide-react';
import { Button } from './ui/button';
import { useSession } from '@/hooks/authentication';
import toast from 'react-hot-toast';


interface MyDropzoneProps {
    onUpload: (files: File[]) => Promise<void>

}



// for each file presigned urls ,
// then for each file upload them along with update filearray  and filedata
export const MyDropZone: React.FC<MyDropzoneProps> = ({ onUpload }) => {

    const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
    const left = useSession((state) => state.spaceLeft)
    const setLeft = useSession((state) => state.setSpaceLeft)


    const removeFile = (index: number) => {
        setUploadedFiles((uploadedFiles) => [...uploadedFiles.slice(0, index), ...uploadedFiles.slice(index + 1)])
    }




    const onDrop = useCallback((acceptedFiles: File[], fileRejections: FileRejection[]) => {

        fileRejections.forEach((rejectedFile) => {
            console.error('Rejected File:', rejectedFile.file);
            console.error('Rejection Error:', rejectedFile.errors);
        });


        setUploadedFiles((prevFiles) => [...prevFiles, ...acceptedFiles]);
    }, []);

    const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop, multiple: true });

    const handleUpload = async () => {

        const totalSize = uploadedFiles.reduce((totalSize, file) => totalSize + file.size, 0)

        const leftAfterUpload = left - totalSize

        if (leftAfterUpload >= 0) {
            setLeft(leftAfterUpload)
            await onUpload(uploadedFiles);
        }
        else {
            toast.error("No Space Left , Update Plan")
        }

    };

    return (
        <div className='flex flex-col w-full h-full gap-2'>
            <div {...getRootProps()} className='min flex-1  w-full flex justify-center items-center flex-col rounded-md relative overflow-hidden border-2 border-foreground/50  border-dashed'  >
                <input {...getInputProps()} className=' z-10 absolute h-full w-full top-0 left-0 ' />
                <p>{isDragActive ? 'Drop the files here...' : 'Drag & drop files here, or click to select files'}</p>
            </div>

            <ScrollArea className="h-20 w-full rounded-md border">
                <div className="p-4">
                    <h4 className="mb-4 text-sm font-medium leading-none">Selected Files</h4>
                    {uploadedFiles.map((file: File, index: number) => (
                        <>
                            <div key={index} className=" flex items-center text-sm">
                                <div>
                                    {file.name}
                                </div>
                                <div className='ml-auto'>
                                    <Trash onClick={() => removeFile(index)} className="w-6 h-6 bg-red-400 hover:bg-red-500 p-1 rounded-sm border border-black cursor-pointer"></Trash>
                                </div>
                            </div>
                            <Separator className="my-2" />
                        </>
                    ))}
                </div>
            </ScrollArea>
            <div className='ml-auto' >
                <Button type='button' onClick={handleUpload} >Upload</Button>
            </div>
        </div>
    );
};