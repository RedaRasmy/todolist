import axios from "@/app/api/axios"
import useAuth from "./useAuth"

type RefreshRes = {
    accessToken : string
}

export default function useRefreshToken() {
    const {setAuth} = useAuth()

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
