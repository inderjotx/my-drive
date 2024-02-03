import { verifyToken } from "@/lib/auth/createToken";
import { prisma } from "@/lib/auth/login";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";





export async function GET(req: NextRequest) {

    const cookieStore = cookies()
    console.log(req.cookies.get('jwt'))
    const token = cookieStore.get('jwt')

    console.log("[TOKEN_IN_GET]")
    console.log(token?.value)

    if (!token?.value) {
        return NextResponse.json({ message: "Invalid request" }, { status: 403 })
    }

    const data = await verifyToken(token.value)

    if (!data) {
        return NextResponse.json({ message: "Invalid request" }, { status: 403 })
    }


    const userData = await prisma.user.findFirst({
        where: {
            id: data.userId
        }
    })

    await prisma.$disconnect()


    if (!userData) {
        return NextResponse.json({ message: "Invalid request" }, { status: 403 })
    }


    userData.password = ""
    return NextResponse.json(userData)


}