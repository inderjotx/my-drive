import bcrypt from 'bcrypt'
import { PrismaClient } from '@prisma/client'

export const prisma = new PrismaClient()


export async function loginUser(email: string
    , password: string) {

    try {
        const isUser = await prisma.user.findFirst({
            where: {
                email: email,
            }
        })


        if (!isUser) {
            return { code: -1, message: "Invalid Credentials" }
        }


        const isCorrect = await bcrypt.compare(password, isUser.password)

        if (isCorrect) {
            console.log("[LOGIN_USER]", isUser)
            isUser.password = ""
            await prisma.$disconnect()
            return { code: 0, message: "User loging Successfully", user: isUser }
        }

    }

    catch (error) {
        console.log("[LOGIN_USER_ERROR]", error)
        return { code: -1, message: "Unknown error occur" }
    }

    finally {
    }
}