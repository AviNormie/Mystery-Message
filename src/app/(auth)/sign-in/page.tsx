'use client'
 import { useSession, signIn,signOut } from "next-auth/react"
 export default function Component(){
 const { data:session } = useSession()
 if(session){
    return (
        <>
        Signed in as {session.user.email} <br />
        <button onClick={()=>signOut()}>Sign Out</button>
        </>
    )
 }
 return(
    <>
    Not signed in bruhh <br/>
    <button className="text-2xl font-bold bg-orange-500 p-2 ml-3 rounded-[5px]" onClick={()=>signIn()}>Sign In</button>
    </>
 )
}