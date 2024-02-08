import Directory from '@/components/Directory'
import { SetSession } from '@/components/addSession'
import { verifyToken } from '@/lib/auth/createToken'
import { redirect } from "next/navigation"
import { cookies } from 'next/headers'
import { prisma } from '@/lib/auth/login'


const getUserData = async function (userId: string) {

    const userData = await prisma.user.findUnique({
        where: {
            id: userId
        }
    })

    if (userData) {
        userData.password = ""
    }

    return userData

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

        const userData = await getUserData(data.userId)
        if (!userData) {
            return (
                <>
                    {children}
                </>
            )
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
