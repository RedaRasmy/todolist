import axios from "@/app/api/axios"
import { useAuthContext } from "@/app/context/AuthContextProvider"

type RefreshRes = {
    accessToken : string
}

export default function useRefreshToken() {
    const {setAuth} = useAuthContext()

    const refresh = async () => {
        const res = await axios.get<RefreshRes>('/auth/refresh' , {
            withCredentials: true
        })
        setAuth(prev => {
            return {
                ...prev,
                accessToken : res.data.accessToken,
                isAuth: true
            }
        })
        return res.data.accessToken
    }

    return refresh
}
