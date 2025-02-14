import { axiosPrivate } from "@/app/api/axios";
import useAuth from "./useAuth";
import useRefreshToken from "./useRefreshToken";
import { useEffect } from "react";

export default function useAxiosPrivate() {
    const refresh = useRefreshToken();

    const { auth } = useAuth();

    useEffect(() => {

        const reqIntercept = axiosPrivate.interceptors.request.use(
            config => {
                if (config.headers && !config.headers['Authorization']) {
                    config.headers['Authorization'] = "Bearer "+ auth.accessToken
                }
                return config
            },
            (err) => Promise.reject(err)
        )
        
        const resIntercept = axiosPrivate.interceptors.response.use(
            res => res,
            async (err) => {
                const prevReq = err.config
                if (err.response.status === 403 && !prevReq.sent) {
                    prevReq.sent = true;
                    const newAccessToken = await refresh()
                    prevReq.headers['Authorization'] = 'Bearer ' + newAccessToken
                    return axiosPrivate(prevReq)
                }
            }
        )

        return () => {
            axiosPrivate.interceptors.response.eject(resIntercept)
            axiosPrivate.interceptors.response.eject(reqIntercept)
        };
    }, [auth, refresh]);

    return axiosPrivate;
}
