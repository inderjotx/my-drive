import { addFileToDatabase } from "@/lib/auth/addFile";
import { verifyToken } from "@/lib/auth/createToken";
import { addFile } from "@/lib/fileSystem";
import { redirect } from "next/navigation";
import { NextRequest, NextResponse } from "next/server";


export async function POST(req: NextRequest) {

    try {


        const { type, key, dataObject } = await req.json()

        const encToken = req.cookies.get('jwt')

        console.log(key)
        console.log(type)
        console.log(encToken)

        if (!encToken || !encToken.value) {
            redirect('/login')
        }

        if (!type || !key || !dataObject) {
            return NextResponse.json({ message: "Invalid request" }, { status: 400 })
        }


        const data = await verifyToken(encToken.value)
        console.log(data)

        if (!data || !data.email || !data.name || !data.userId) {
            redirect('/login')
        }


        const updateUser = await addFileToDatabase(key, data.userId, dataObject)

        return NextResponse.json(updateUser, { status: 200 })

    }

    catch (error) {
        console.log('[ERROR_IN_ADDFILE_GET_ROUTE]', error)
        return NextResponse.json(error, { status: 400 })
    }



}
