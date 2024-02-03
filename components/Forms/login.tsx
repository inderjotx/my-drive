"use client"

import * as z from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import axios from "axios"

import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useSession } from "@/hooks/authentication"
import { useData } from "@/hooks/FileData"
import { json } from "stream/consumers"

const formSchema = z.object({
    email: z.string().min(1).email("This is not a valid email "),
    password: z.string().min(5, "Password should altest be 5 character long").max(20)
})


type formSchemaType = z.infer<typeof formSchema>






export function LoginForm() {

    const router = useRouter()

    const setSession = useSession((state) => state.setSession)
    const loadArray = useData((state) => state.loadArray)
    const loadData = useData((state) => state.loadFileData)

    const form = useForm<formSchemaType>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            password: "",
            email: ""
        },
    })



    async function onSubmit(values: formSchemaType) {

        try {

            const { data } = await axios.post("/api/login", {
                user: {
                    email: values.email,
                    password: values.password,
                }
            })

            console.log("[DATA_RETURDED_LOGIN]")
            console.log(typeof data)
            const jsonData = JSON.parse(data)
            const user = jsonData.user

            console.log(user.dataObject)


            setSession(user.name, user.email, user.id)
            loadArray(user.dataArray)
            loadData(JSON.parse(user.dataObject))

            router.push('/')




        }


        catch (error) {
            console.log("[LOGIN_ERROR_PAGE]", error)
        }



    }



    return (

        <div className="w-full h-full flex justify-center ">

            <Form {...form} >
                <form onSubmit={form.handleSubmit(onSubmit)} className=" flex  flex-col mt-24 items-center   space-y-10 lg:w-2/5 w-9/12">
                    <div className="mr-auto" >
                        <h1 className="text-4xl font-medium">Login</h1>
                    </div>
                    <div className="space-y-4 w-full  ">
                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Email</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Email" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="password"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Password</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Password" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>

                    <div className="space-x-2 ">
                        <Button type="submit" className="">Submit</Button>
                        <Button variant="outline" type="button" className="">
                            <Link href={"/"}>
                                Cancel
                            </Link>
                        </Button>
                    </div>
                    <h3 className="text-sm text-muted-foreground ">New on this application <Link href={"/register"} className="font-semibold text-foreground">Register here </Link> </h3>

                </form>

            </Form>


        </div>

    )
}


