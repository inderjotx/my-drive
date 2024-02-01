import Directory from '@/components/Directory'
import { SetSession } from '@/components/addSession'
import { verifyToken } from '@/lib/auth/createToken'
import { redirect } from "next/navigation"
import { cookies } from 'next/headers'


export default async function Home() {

  const cookiesStore = cookies()
  const jwt = cookiesStore.get('jwt')

  if (!jwt) {
    redirect("/login")
  }

  const data = await verifyToken(jwt?.value)

  if (!data || !data.userId || !data.email || !data.name) {
    redirect('/login')
  }



  return (
    <div className='w-full h-full'>
      <SetSession email={data.email} userId={data.userId} name={data.name} />
      <Directory />
    </div>
  )
}
