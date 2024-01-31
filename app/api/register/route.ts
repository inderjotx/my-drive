import { registerUser } from "@/lib/auth/register"

export interface UserType {
    email: string,
    password: string,
    name: string,
}

export async function POST(req: Request) {
    const data = await req.json()
    const user: UserType = data.user


    if (!user || !user.email || !user.name || !user.password) {
        return Response.json({ message: "Data is Missing " }, { status: 400 });
    }


    try {


        const user: UserType = data.user
        console.log("User inside the backend")
        console.log(user)
        const response = await registerUser(user.name, user.email, user.password)
        const statusCode = 200
        console.log(response)
        return Response.json(response, { status: statusCode })

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