import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()


export async function addFileToDatabase(name: string, userId: string, dataObject: FileSystem) {

    try {
        const isUser = await prisma.user.findFirst({
            where: {
                id: userId
            }
        })


        if (!isUser) {
            return { code: -1, message: "Invalid Credentials" }
        }


        const dataArray = isUser.dataArray
        dataArray.push(name)

        const isUpdated = await prisma.user.update({
            where: {
                id: userId
            },
            data: {
                dataArray: dataArray,
                dataObject: JSON.stringify(dataObject)
            }
        })



        if (isUpdated) {
            console.log("[LOGIN_USER]", isUpdated)
            isUser.password = ""
            return { code: 0, message: "User loging Successfully", user: isUser }
        }

    }

    catch (error) {
        console.log("[LOGIN_USER_ERROR]", error)
        return { code: -1, message: "Unknown error occur" }
    }

    finally {
        await prisma.$disconnect()
    }
}