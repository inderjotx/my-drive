import { useCreateDoc } from "@/store/CreateForm"


export interface FileSystem {
    [key: string]: FileSystem
}


export interface IconType {
    name: string,
    type: string,
    key: string
}






export function getChildren(path: string, data: FileSystem): IconType[] {

    const keys = path.split('/').slice(1)
    let newData = data
    for (let index in keys) {

        newData = newData[keys[index]]

    }

    // console.log(newData)
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



export function createDoc() {

    const { attachment, type, docName } = useCreateDoc.getState()

    console.log("data inside create doc")
    console.log(attachment)
    console.log(type)
    console.log(docName)

    // if , type is file 
    // send the file to the database 


    // update filesystem object 


}