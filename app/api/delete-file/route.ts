import { verifyToken } from "@/lib/auth/createToken";
import { prisma } from "@/lib/auth/login";
import { deleteFromKey } from "@/lib/storeToS3";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";





export async function GET(req: NextRequest) {

    const { searchParams } = new URL(req.url)
    const userId = searchParams.get('userId')
    const key = searchParams.get('key')

    if (!userId || !key) {
        return NextResponse.json({ message: "Invalid request" }, { status: 403 })
    }


    try {

        const response = await deleteFromKey(key)
        if (response) {
            return NextResponse.json({ message: "Successfully deleted " }, { status: 200 })
        }

        else {
            return NextResponse.json({ message: "error while eleting " }, { status: 200 })
        }

    }

    catch (error) {
        console.log('[ERROR]', error)
    }

}