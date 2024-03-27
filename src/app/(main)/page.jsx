import Container from "@/components/Container";
import { options } from "../api/auth/[...nextauth]/options" 
import { getServerSession } from "next-auth"
import Link from "next/link";

const HomePage = async() => {
    const session = await getServerSession(options);
    console.log("Session Home : ",session)
  return (
    <div>
        {session ?
            <div className="">
                <p>You are logged In</p>
                <p>{session?.user.name}</p>
                <p>{session?.user.email}</p>
                <Link href="/api/auth/signout">Sign Out</Link>
            </div>
            :
            <div>
                <p>You are not logged in </p>
                <Link href="/api/auth/signin?callbackUrl=/">Sign In</Link>
            </div>
        }
    </div>
  )
}

export default HomePage