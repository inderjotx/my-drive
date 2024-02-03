import { useCreateDoc } from "@/hooks/CreateForm"
import { useFileSystem } from "@/hooks/FileSystemState"
import { useData } from "@/hooks/FileData"
import { useLoading } from "@/hooks/loadinghoo"
import axios from 'axios'



export interface FileSystem {
    [key: string]: FileSystem
}


export interface IconType {
    name: string,
    type: string,
    key: string
}




export function getChildren(path: string, data: FileSystem): IconType[] {

    try {
        const keys = path.split('/').slice(1)
        console.log(path)
        console.log(data)
        let newData = data
        for (let key in keys) {
            newData = newData[keys[key]]
        }

        console.log(newData)
        const children = Object.keys(newData)

        const childrenObjects = children.map((name) => {
            const type = (name.includes('.')) ? "file" : "folder"
            const newKeys = [...keys]
            newKeys.push(name)

            const key = "/" + newKeys.join("/")
            return {
                name: name,
                type: type,
                key: key
            }
        })

        return childrenObjects

    }
    catch (error) {
        console.log('[GET_CHILDREN]', error)
        return []
    }

}


function getKey(fileName: string) {

    const activeDir = useFileSystem.getState().activeDirPath
    return `${activeDir}/${fileName}`
}






export async function createDoc() {

    const { attachment, type, docName } = useCreateDoc.getState()
    const updateFileData = useData.getState().addFile
    const setLoading = useLoading.getState().setLoading
    const setOpen = useCreateDoc.getState().setIsOpen

    const key = getKey(docName)

    setLoading(true)


    // if file upload to s3 after getting the presigned url
    if (type == "file") {
        const { data: { url } } = await axios.post('/api/get-url', {
            key,
            method: "put"
        })


        if (!url) {
            console.log("No valid url ")
        }

        try {
            const response = await axios.put(url, attachment, { headers: { 'Content-Type': attachment?.type } })
            console.log(response)
        }

        catch (error) {
            console.log(error)
        }

    }


    // update filesystem object and fileArray 

    updateFileData({ name: docName, type: type })


    // send data to backend 
    setLoading(false)
    setOpen(false)


}


export function getFileSystem(paths: string[]): FileSystem {
    const filesystem: (FileSystem | null) = {};

    for (const path of paths) {
        const components = path.split('/');

        let currentLevel: FileSystem = filesystem;
        for (const component of components.slice(1)) {
            if (!currentLevel[component]) {
                currentLevel[component] = {};
            }

            currentLevel = currentLevel[component] as FileSystem;
        }
    }

    return filesystem;
}


export async function addFile(path: string, type: string, data: FileSystem) {
    const pathArray = path.split('/');
    let current = data;

    // Traverse the path to the parent directory
    for (let i = 1; i < pathArray.length - 1; i++) {
        const folder = pathArray[i];
        current = current[folder];
    }

    // Add the new file to the parent directory
    const fileName = pathArray[pathArray.length - 1];


    // add metadata here , not empty object
    current[fileName] = {};

    let clone = JSON.parse(JSON.stringify(data))

    const response = await sendFileToDatabase(path, type, clone)

    // return the same doesn't changes the state of useEffect , ( zustand's state is suppose to be immuatable)
    return clone;
}



export function deleteFile(path: string, root: FileSystem) {
    const pathArray = path.split('/');
    let current = root;

    // Traverse the path to the parent directory
    for (let i = 1; i < pathArray.length - 1; i++) {
        const folder = pathArray[i];
        current = current[folder];
    }

    // Add the new file to the parent directory

    console.log(current)
    delete current[pathArray[pathArray.length - 1]]

    return root;
}

export async function sendFileToDatabase(file: string, type: string, dataObject: FileSystem) {

    const data = await axios.post('/api/add-file', {
        type,
        key: file,
        dataObject
    })


    return data.data


}