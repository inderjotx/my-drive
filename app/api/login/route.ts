import { getToken } from "@/lib/auth/createToken";
import { loginUser } from "@/lib/auth/login";
import { NextResponse } from "next/server";

export interface UserType {
    email: string,
    password: string,
}

export async function POST(req: Request) {
    const data = await req.json()
    const user: UserType = data.user


    if (!user || !user.email || !user.password) {
        return Response.json({ message: "Data is Missing " }, { status: 400 });
    }


    try {


        const user: UserType = data.user
        console.log("User inside the backend")
        console.log(user)
        const response = await loginUser(user.email, user.password)
        const token = await getToken(response?.user?.name, response?.user.email, response?.user.id)
        console.log(token)
        // console.log(response)
        const nextres = NextResponse.json(JSON.stringify(response), { status: 200, headers: { 'content-type': "application/json" } })


        nextres.cookies.set(
            {
                name: 'jwt',
                value: token,
            }
        )

        return nextres
    }

    catch (error) {

        if (error instanceof Error) {
            console.log(error.message)
            return Response.json(error, { status: 400 })
        }

        console.log(error)
        return Response.json(error, { status: 400 })

    }



}