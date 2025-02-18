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
                    console.log('req.headers.auth not exist :',config.headers)
                    config.headers['Authorization'] = `Bearer ${auth.accessToken}`
                    console.log('req.headers.auth added :',config.headers)
                }
                return config
            },
            (err) => Promise.reject(err)
        )
        
        const resIntercept = axiosPrivate.interceptors.response.use(
            res => res,
            async (err) => {
                
                const prevReq = err.config
                if (err.response?.status && err.response.status === 403 && !prevReq.sent) {
                    prevReq.sent = true;
                    try {
                        console.log('trying to get new accessToken')
                        const newAccessToken = await refresh()
                        console.log('new access token :',newAccessToken)
                        prevReq.headers['Authorization'] = `Bearer ${newAccessToken}`
                        return axiosPrivate(prevReq)
                    } catch (refreshError) {
                        console.log('failed to get new accessToken')
                        console.error("refresh error :" , refreshError)
                        return Promise.reject(refreshError);
                    }
                }
                return Promise.reject(err)
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
