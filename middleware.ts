
import { verifyToken } from '@/lib/auth/createToken'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { useSession } from './hooks/authentication'




export async function middleware(request: NextRequest) {

    const jwtEncToken = request.cookies.get('jwt')

    try {

        if (!jwtEncToken) {
            console.log("[NO_COOKIE_SET] -> LOGIN")
            return NextResponse.redirect(new URL('/login', request.url))
        }



        const data = await verifyToken(jwtEncToken.value)
        if (!data || typeof data == 'string' || !data.name || !data.email || !data.userId) {
            console.log("[INVALID_COOKIE] -> LOGIN")
            return NextResponse.redirect(new URL('/login', request.url))
        }

    }

    catch (error) {
        console.log('[ERROR_IN_TOKEN => REDIRECT /login]', error)
        return NextResponse.redirect(new URL('/login', request.url))
    }


}



export const config = {
    matcher: '/',
}