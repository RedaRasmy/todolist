'use client'
import { createContext, Dispatch, ReactNode, SetStateAction, useState } from "react";

type Auth = {
    username?: string ,
    accessToken?: string,
    isAuth : boolean
}

type AuthContextType = {
    auth: Auth,
    setAuth: Dispatch<SetStateAction<Auth>>
}

const initalAuth = {
    isAuth: false
}
const initalAuthContext = {
    auth: initalAuth ,
    setAuth: ()=>{}
}

const AuthContext = createContext<AuthContextType>(initalAuthContext);

export const AuthProvider = ({ children }:{
    children? : ReactNode
}) => {
    const [auth, setAuth] = useState<(Auth)>(initalAuth)

    return <AuthContext.Provider value={{auth,setAuth}}>
        {children}
        </AuthContext.Provider>;
};

export default AuthContext