import { axiosPrivate } from "@/app/api/axios"
import { useAuthContext } from "@/app/context/AuthContextProvider"

type RefreshRes = {
    accessToken : string
}

export default function useRefreshToken() {
    const {setAuth} = useAuthContext()

    const refresh = async () => {
        try {
            const res = await axiosPrivate.get<RefreshRes>('/auth/refresh')
            setAuth(prev => {
                return {
                    ...prev,
                    accessToken : res.data.accessToken,
                    isAuth: true
                }
            })
            console.log('refreshed accessToken : ',res.data.accessToken)
            return res.data.accessToken
        } catch (error) {
            console.log("failed to get new access token :", error)
        }
    }

    return refresh
}
