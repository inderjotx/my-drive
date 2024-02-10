import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()


export async function addFileToDatabase(left: number, dataArray: string[], userId: string, dataObject: FileSystem) {

    try {

        const isUpdated = await prisma.user.update({
            where: {
                id: userId
            },
            data: {
                left: left,
                dataArray: dataArray,
                dataObject: JSON.stringify(dataObject)
            }
        })



        if (isUpdated) {
            console.log("[LOGIN_USER]", isUpdated)
            isUpdated.password = ""
            return { code: 0, message: "User loging Successfully", user: isUpdated }
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