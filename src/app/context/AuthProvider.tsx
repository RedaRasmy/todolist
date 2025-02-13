'use client'
import { createContext, Dispatch, ReactNode, SetStateAction, useState } from "react";

type Auth = {
    username : string,
    accessToken : string
}

type AuthContextType = {
    auth: Auth | undefined,
    setAuth: Dispatch<SetStateAction<Auth | undefined>>
}

const AuthContext = createContext<AuthContextType>({
    auth: undefined ,
    setAuth: () => {}
});

export const AuthProvider = ({ children }:{
    children? : ReactNode
}) => {
    const [auth, setAuth] = useState<(Auth | undefined)>(undefined)

    return <AuthContext.Provider value={{auth,setAuth}}>
        {children}
        </AuthContext.Provider>;
};

export default AuthContext