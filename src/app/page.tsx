'use client'
import useAuth from "./auth/hooks/useAuth";

export default function Home() {
    const {auth} = useAuth()

    console.log(auth)
    return (
        <div>
            {
                auth ? 
                <p>{auth.username}</p>
                : "unauthorized"
            }
        </div>
    )
}
