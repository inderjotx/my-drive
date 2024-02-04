import Directory from '@/components/Directory'
import { SetSession } from '@/components/addSession'
import { verifyToken } from '@/lib/auth/createToken'
import { redirect } from "next/navigation"
import { cookies } from 'next/headers'
import axios from 'axios'
import { User } from '@prisma/client'


const getUserData = async function (jwt: string) {

    try {

        const { data } = await axios.get('http://localhost:3000/api/user-info', {
            headers: {
                cookie: `jwt=${jwt}`
            }
        })
        return data as User | { "message": string }
    }
    catch (error) {
        console.log('[ERROR_GETTING_USER_DATA]')
        console.log(error)
        return { message: "something is wrong" }
    }
}




export async function SessionProvider({ children }: { children: React.ReactNode }) {

    const cookiesStore = cookies()
    const jwt = cookiesStore.get('jwt')


    if (!jwt) {
        return (<>{children}</>)
    }

    try {

        const data = await verifyToken(jwt?.value)
        if (!data || !data.userId || !data.email || !data.name) {
            redirect('/login')
        }

        const userData = await getUserData(jwt.value)

        if ("message" in userData) {
            redirect('/login')
        }


        return (

            <>
                <SetSession email={userData.email} userId={userData.id} name={userData.name} fileArray={userData.dataArray}
                    FileData={JSON.parse(userData.dataObject as string)} />
                {children}
            </>
        )

    }

    catch (error) {
        console.log('[NO_TOKEN_ERRROR => /login  ]')
        return (
            <>
                {children}
            </>
        )
    }




}
