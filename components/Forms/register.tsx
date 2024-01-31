"use client"

import * as z from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import axios from "axios"

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

const formSchema = z.object({
    username: z.string().min(2, "Name Should atleast have 5 characters").max(50),
    email: z.string().min(1).email("This is not a valid email "),
    password: z.string().min(5, "Password should altest be 5 character long").max(20)
})


type formSchemaType = z.infer<typeof formSchema>

export function RegisterForm() {

    const router = useRouter()

    const form = useForm<formSchemaType>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            username: "",
            password: "",
            email: ""
        },
    })

    async function onSubmit(values: formSchemaType) {
        console.log(values)


        try {

            const { data } = await axios.post("/api/register", {
                user: {
                    name: values.username,
                    email: values.email,
                    password: values.password,
                }
            })

            console.log("data")
            console.log(data)
            router.push('/login')



        }

        catch (error) {
            console.log("[ON_SUBMIT_REGISTER_ERROR]", error)
        }



    }




    return (


        <div className="h-full w-full flex justify-center ">

            <Form {...form} >
                <form onSubmit={form.handleSubmit(onSubmit)} className=" flex flex-col mt-24  items-center space-y-10  lg:w-2/5 w-9/12">
                    <div className="mr-auto" >
                        <h1 className="text-4xl font-medium">Register</h1>
                    </div>
                    <div className="space-y-4 w-full  ">
                        <FormField
                            control={form.control}
                            name="username"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Username</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Username" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
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

                    <div className=" space-x-2">
                        <Button type="submit" className="">Submit</Button>
                        <Button type="button" variant="outline" className="">
                            <Link href={"/"}>
                                Cancel
                            </Link>
                        </Button>
                    </div>
                    <h3 className="text-sm text-muted-foreground">Already registered ?  <Link href={'/login'} className="font-semibold cursor-pointer text-foreground">Login here </Link> </h3>
                </form>
            </Form>
        </div>
    )
}


