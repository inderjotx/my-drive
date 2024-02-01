
import { SignJWT, jwtVerify, type JWTPayload } from 'jose';


const SECRET_KEY = "my-secret-key"
const EXPIRY_DURATION = 60 * 60



// export function getToken() {
//     const token = jwt.sign({ data }, SECRET_KEY, { expiresIn: EXPIRY_DURATION })
//     return token;


// }

interface Token {
    name: string,
    email: string,
    userId: string
}


export async function getToken(name: string, email: string, userId: string): Promise<string> {

    const payload = { name: name, email: email, userId: userId }
    const iat = Math.floor(Date.now() / 1000);
    const exp = iat + EXPIRY_DURATION // one hour

    return new SignJWT({ ...payload })
        .setProtectedHeader({ alg: 'HS256', typ: 'JWT' })
        .setExpirationTime(exp)
        .setIssuedAt(iat)
        .setNotBefore(iat)
        .sign(new TextEncoder().encode(SECRET_KEY));
}


export async function verifyToken(token: string): Promise<Token> {

    const { payload } = await jwtVerify(token, new TextEncoder().encode(SECRET_KEY));

    console.log("[VERIFY_TOKEN_RESPONSE]")
    console.log(payload)

    // @ts-ignore
    return payload;
}