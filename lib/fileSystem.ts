import { useCreateDoc } from "@/hooks/CreateForm"
import { useFileSystem } from "@/hooks/FileSystemState"
import { useData } from "@/hooks/FileData"
import { useLoading } from "@/hooks/loadinghoo"
import axios from 'axios'
import { useSession } from "@/hooks/authentication"
import { object } from "zod"



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

async function getPresignedUrl(key: string, method: string) {
    try {

        const { data: { url } } = await axios.post('/api/get-url', {
            key,
            method
        })

        return url

    }

    catch (error) {
        console.log('[ERROR_PRESIGNED_URL]', error)
        return null
    }
}



async function storeInS3(url: string, file: File | null) {

    try {
        if (!file) {
            const error = new Error("File is null")
            throw error
        }
        const response = await axios.put(url, file, { headers: { 'Content-Type': file.type } })
        return true
    }
    catch (error) {
        console.log('[ERROR_storeInS3] fileSystem :95', error)
        return false
    }

}


function updateStateData(name: string, type: string) {

    const currentDir = useFileSystem.getState().activeDirPath
    const { loadArray, loadFileData, FileData, fileArray } = useData.getState()

    const pathArray = currentDir.split('/');
    let current = FileData;

    for (let i = 1; i < pathArray.length - 1; i++) {
        const folder = pathArray[i];
        current = current[folder];
    }

    const fileName = pathArray[pathArray.length - 1];

    current[fileName] = {};
    const newKey = getKey(name)

    loadFileData(JSON.parse(JSON.stringify(FileData)))
    loadArray([...fileArray, newKey])


    // return the same doesn't changes the state of useEffect , ( zustand's state is suppose to be immuatable)
}





export async function deleteDoc(key: string) {

    const { fileArray, FileData, loadArray, loadFileData } = useData.getState()

    // update object and array
    const newData = deleteFileData(key, FileData)
    console.log('After updaing object')
    console.log(newData)
    const newArray = deleteFileArray(key, fileArray)

    console.log('Updated Array')
    console.log(newArray)

    // update database 
    const respone = await sendFileToDatabase(newArray, newData)


    // update bucket 
    const deletS3 = await deleteFromBucket(key)


    loadFileData(newData)
    loadArray(newArray)
}



async function deleteFromBucket(key: string) {

    const userId = useSession.getState().userId
    try {

        const { data } = await axios.get('/api/delete-file', {
            params: {
                userId,
                key,
            }
        })

        return data
    }

    catch (error) {
        console.log('[error deleteing in S3]', error)
    }



}






export async function createDoc() {

    const { attachment, type, docName } = useCreateDoc.getState()
    // const updateFileData = useData.getState().addFile
    const setLoading = useLoading.getState().setLoading
    const setOpen = useCreateDoc.getState().setIsOpen

    const key = getKey(docName)




    // if file upload to s3 after getting the presigned url
    if (type == "file") {

        const url = await getPresignedUrl(key, 'put')

        const hasStored = await storeInS3(url, attachment)

    }

    // update filesystem object and fileArray 
    // updateFileData({ name: docName, type: type })

    updateStateData(docName, type)

    // send data to backend 
    const response = await sendFileToDatabase()

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


// updateing object 
// updating array 
// updateing database 
// deleting from the s3 bucket 

export function deleteFileData(path: string, root: FileSystem) {
    const pathArray = path.split('/');
    let current = root;

    // Traverse the path to the parent directory
    for (let i = 1; i < pathArray.length - 1; i++) {
        const folder = pathArray[i];
        current = current[folder];
    }

    delete current[pathArray[pathArray.length - 1]]

    return JSON.parse(JSON.stringify(root));
}


function deleteFileArray(path: string, array: string[]) {

    return array.filter((item) => (item.indexOf(path) === -1))
}






export async function sendFileToDatabase(dataArray?: string[], dataObject?: FileSystem) {

    let data = dataObject
    let array = dataArray

    if (!data || !array) {

        array = useData.getState().fileArray
        data = useData.getState().FileData
    }


    try {
        console.log("before seing databata ojbect")
        const reponse = await axios.post('/api/add-file', {
            dataArray: array,
            dataObject: data
        })

        return true
    }

    catch (error) {
        console.log('[ERROR_sendFileToDatabase filesystem : 253]', error)
        return false
    }


}