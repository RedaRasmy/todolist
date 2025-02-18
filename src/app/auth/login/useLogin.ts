import axios from "@/app/api/axios";
import { useAuthContext } from "@/app/context/AuthContextProvider";
import { SubmitFunction } from "../components/Form";
import getAuthErrorMessage from "../utils/getAuthErrorMessage";
// import { redirect } from "next/navigation";

type LoginRes = {
    accessToken : string
}

export default function useLogin() {
    const { setAuth } = useAuthContext()
    
    const handleLogin: SubmitFunction = async (data, setError) => {
        try {
            const res = await axios.post<LoginRes>("/auth/login", JSON.stringify(data), {
                headers: {
                    "Content-Type": "application/json",
                },
                withCredentials: true,
            });
            const accessToken = res.data.accessToken
            // i need to store token
            console.log("this is login response : ", res)

            const newAuth = {
                username:data.username,
                accessToken,
                isAuth: true
            }
            setAuth(newAuth)
            localStorage.setItem('auth',JSON.stringify(newAuth))
            console.log('logged in')
            return res;
        } catch (err) {
            console.log(err)
            const message = getAuthErrorMessage(err);
            setError("username", { 
                message,
            });
            return err;
        }
    };

    return handleLogin
}
