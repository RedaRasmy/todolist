import axios from "@/app/api/axios"
import { SubmitFunction } from "../components/Form"
import useLogin from "../login/useLogin"
import getAuthErrorMessage from "../utils/getAuthErrorMessage"

export default function useRegister() {
    const handleLogin = useLogin()

    const handleRegister: SubmitFunction = async (data,setError) => {
        try {
            const res = await axios.post(
                "/auth/register",
                JSON.stringify(data),
                {
                    headers: {
                        'Content-Type' : "application/json",
                    },
                    withCredentials: true
                }
            )
            handleLogin(data,setError)
            return res
        } catch (err) {
            const message = getAuthErrorMessage(err)
            setError('username',{
                message,
            })
            return err
        }
    }

    return handleRegister
}
