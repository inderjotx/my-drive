import bcrypt from "bcrypt"
import { User, PrismaClient } from '@prisma/client'
import { UserType } from '@/app/api/register/route'
import { getCurDate } from "./date"

const SALT_ROUNDS = 10

const prisma = new PrismaClient()


export async function registerUser(name: string, email: string
    , password: string) {

    const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS)

    try {
        const newUser = await prisma.user.create({
            data: {
                name: name,
                email: email,
                password: hashedPassword,
                dataArray: ['/home'],
                dataObject: JSON.stringify({
                    children: {
                        home: {
                            children: {},
                            metadata: {
                                type: 'folder',
                                time: getCurDate(),
                                size: "Don't know"
                            }
                        }
                    },
                    metadata: {
                        type: 'folder',
                        time: getCurDate(),
                        size: "Don't know"
                    }
                })
            }
        })

        console.log("[REGISTER_USER_DATA]", newUser)
        return { user: newUser }
    }

    catch (error) {
        console.log("[REGISTER_USER_ERROR]", error)
        process.exit(1)
    }

    finally {
        await prisma.$disconnect()
    }
}