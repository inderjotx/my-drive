import { getPresignedUrl } from "@/lib/storeToS3"

export async function POST(req: Request) {

    const data = await req.json()

    if (!data || !data.key || !data.method) {
        return Response.json({ message: "Invalid request no image key was sent" }, { status: 400 })
    }

    const url = await getPresignedUrl(data.key, data.method)

    return Response.json({ url: url }, { status: 200 })

} 