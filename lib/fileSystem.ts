import { useCreateDoc } from "@/hooks/CreateForm"
import { useFileSystem } from "@/hooks/FileSystemState"
import { useData } from "@/hooks/FileData"
import axios from 'axios'
import { useSession } from "@/hooks/authentication"
import { useLoading } from "@/hooks/loadinghoo"
import { getCurDate } from "./auth/date"



export interface FileSystem {
    "children": {
        [key: string]: FileSystem
    }
    "metadata": Metadata
}

interface Metadata {
    "type": string,
    "size": string,
    "time": string
    "key": string
}


export interface IconType {
    name: string,
    type: string,
    key: string
}



function computerSize(data: FileSystem,): number {

    let sizeOfDir = 0;

    if (data.metadata.type !== "folder") {
        return parseInt(data.metadata.size, 10)
    }


    // go to children 
    const childrens = data.children

    // get their key 
    const keys = Object.keys(childrens)


    // for each key 

    keys.forEach((key) => {

        sizeOfDir += computerSize(childrens[key])

    })

    return sizeOfDir

}

export function getChildren(path: string, data: FileSystem): IconType[] {

    try {
        const keys = path.split('/').slice(1)
        console.log(path)
        console.log(data)
        let newData = data
        for (let key in keys) {
            newData = newData['children'][keys[key]]
        }

        console.log(newData)
        const children = Object.keys(newData.children)


        const childrenObjects = children.map((name) => {
            const type = newData.children[name].metadata.type
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


function updateStateData(name: string, type: string, fileSize: number) {

    const currentDir = useFileSystem.getState().activeDirPath
    const { loadArray, loadFileData, FileData, fileArray } = useData.getState()

    const pathArray = currentDir.split('/').slice(1);
    console.log(pathArray)
    let current = FileData;

    console.log("filedata from the state ")
    console.log(FileData)

    for (let i = 0; i < pathArray.length; i++) {
        const folder = pathArray[i];
        console.log("currents' s children")
        console.log(current.children)
        console.log(current.children.home)
        current = current.children[folder];
    }

    console.log("current")
    console.log(current)

    const newKey = getKey(name)
    current.children[name] = {
        "children": {},
        "metadata": {
            "type": type,
            "time": getCurDate(),
            "size": `${fileSize}`,
            "key": newKey

        }
    };
    console.log(FileData)

    loadFileData(JSON.parse(JSON.stringify(FileData)))
    loadArray([...fileArray, newKey])


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
    const respone = sendFileToDatabase(newArray, newData)


    // update bucket 
    const deletS3 = deleteFromBucket(key)


    const resolvePromise = await Promise.all([respone, deletS3])



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



function updateState(dataArray: string[], fileData: FileSystem, fileName: string, fileType: string, currentDir: string, fileSize: number) {


    const pathArray = currentDir.split('/').slice(1);



    let current = fileData;


    for (let i = 0; i < pathArray.length; i++) {
        const folder = pathArray[i];
        current = current.children[folder];
    }


    current.children[fileName] = {
        "children": {},
        "metadata": {
            "type": fileType,
            "time": getCurDate(),
            "size": `${fileSize}`,
            "key": currentDir + '/' + fileName
        }
    };


    const newKey = currentDir + '/' + fileName

    dataArray = [...dataArray, newKey]

    return {
        array: dataArray,
        object: JSON.parse(JSON.stringify(fileData)),
    }


}












export async function bulkUpload(files: File[]) {



    const setLoading = useLoading.getState().setLoading
    const setBeingCreated = useLoading.getState().setBeingCreated
    const setOpen = useCreateDoc.getState().setIsOpen
    const { fileArray, FileData, loadArray, loadFileData } = useData.getState()
    const currentDir = useFileSystem.getState().activeDirPath



    setLoading(true)
    setOpen(false)
    // generating promise of urls 
    const promiseUrls = files.map((file: File) => getPresignedUrl(currentDir + '/' + file.name, "put"))


    const urls = await Promise.all(promiseUrls)


    console.log(urls)


    // put promises simulatneously
    const putPromise = files.map((file: File, index: number) => storeInS3(urls[index], file))



    // update dataArray and dataObject  
    let state = {
        object: FileData,
        array: fileArray as string[]
    }

    const fileNames: string[] = []

    files.forEach((file: File) => {
        fileNames.push(currentDir + '/' + file.name)
        state = updateState(state.array, state.object, file.name, file.type, currentDir, file.size)
    })




    setBeingCreated(fileNames)

    console.log(state.array)
    console.log(state.object)

    loadArray(state.array)
    loadFileData(state.object)



    const sendToDb = sendFileToDatabase(state.array, state.object)

    const resolvingAllPromises = await Promise.all([...putPromise, sendToDb])

    setLoading(false)
    setBeingCreated([])


}









export async function createDoc() {

    const { attachment, type, docName } = useCreateDoc.getState()
    // const updateFileData = useData.getState().addFile

    const setOpen = useCreateDoc.getState().setIsOpen

    // eslint-disable-next-line react-hooks/rules-of-hooks
    const setBeingCreate = useLoading.getState().setBeingCreated



    const key = getKey(docName)
    setBeingCreate([key])





    setOpen(false)



    updateStateData(docName, type, attachment?.size as number)

    // if file upload to s3 after getting the presigned url
    if (type != "folder") {

        const url = await getPresignedUrl(key, 'put')

        const hasStored = storeInS3(url, attachment)

        const response = sendFileToDatabase()

        await Promise.all([hasStored, response])

    }

    else {

        const response = await sendFileToDatabase()
    }

    setBeingCreate([])


}





export function deleteFileData(path: string, root: FileSystem) {
    const pathArray = path.split('/');
    let current = root;

    const spaceLeft = useSession.getState().spaceLeft
    const setSpaceLeft = useSession.getState().setSpaceLeft

    // Traverse the path to the parent directory
    for (let i = 1; i < pathArray.length - 1; i++) {
        const folder = pathArray[i];
        current = current.children[folder];
    }

    const name = pathArray[pathArray.length - 1]


    const size = computerSize(current.children[name])
    console.log(name)
    console.log(current.children[name])
    console.log(size)
    setSpaceLeft(spaceLeft + size)


    delete current.children[name]

    return JSON.parse(JSON.stringify(root));
}


function deleteFileArray(path: string, array: string[]) {

    return array.filter((item) => (item.indexOf(path) === -1))
}






export async function sendFileToDatabase(dataArray?: string[], dataObject?: FileSystem) {

    let data = dataObject
    let array = dataArray
    const left = useSession.getState().spaceLeft

    if (!data || !array) {

        array = useData.getState().fileArray
        data = useData.getState().FileData
        console.log("befre seidng data to database")
        console.log(data)

    }


    try {
        const reponse = await axios.post('/api/add-file', {
            dataArray: array,
            dataObject: data,
            left: left
        })

        return true
    }

    catch (error) {
        console.log('[ERROR_sendFileToDatabase filesystem : 253]', error)
        return false
    }


}