

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