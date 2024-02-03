
import { verifyToken } from '@/lib/auth/createToken'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { useSession } from './store/authentication'




export async function middleware(request: NextRequest) {

    const jwtEncToken = request.cookies.get('jwt')


    console.log('triggered')
    if (!jwtEncToken) {
        console.log("[NO_COOKIE_SET] -> LOGIN")
        return NextResponse.redirect(new URL('/login', request.url))
    }
    console.log(jwtEncToken.value)
    const data = await verifyToken(jwtEncToken.value)
    console.log(data)

    if (!data || typeof data == 'string' || !data.name || !data.email || !data.userId) {
        console.log("[INVALID_COOKIE] -> LOGIN")
        return NextResponse.redirect(new URL('/login', request.url))
    }

    console.log("here")

}



export const config = {
    matcher: '/',
}