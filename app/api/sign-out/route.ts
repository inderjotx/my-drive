import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {

    // check if the cookies exist 

    req.cookies.delete('jwt')


    return NextResponse.json({ message: "User logged Out " }, { status: 200 })
}
