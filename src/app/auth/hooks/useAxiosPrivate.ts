import { axiosPrivate } from "@/app/api/axios";
import { useAuthContext } from "@/app/context/AuthContextProvider";
import useRefreshToken from "./useRefreshToken";
import { useEffect } from "react";

export default function useAxiosPrivate() {
    const refresh = useRefreshToken();

    const { auth } = useAuthContext();

    console.log('before interceptors',auth)

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
                    try {
                        const newAccessToken = await refresh()
                        prevReq.headers['Authorization'] = 'Bearer ' + newAccessToken
                        return axiosPrivate(prevReq)
                    } catch (refreshError) {
                        console.error("refresh error :" , refreshError)
                        return Promise.reject(refreshError);
                    }
                }
                // return Promise.reject(err)
            }
        )

        return () => {
            axiosPrivate.interceptors.response.eject(resIntercept)
            axiosPrivate.interceptors.response.eject(reqIntercept)
        };
    }, [auth, refresh]);

    console.log('after interceptors',auth)

    return axiosPrivate;
}
