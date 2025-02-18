"use client";
import { redirect } from "next/navigation";
import {
    createContext,
    Dispatch,
    ReactNode,
    SetStateAction,
    useContext,
    useEffect,
    useState,
} from "react";

type Auth = {
    username?: string;
    accessToken?: string;
    isAuth: boolean;
};

type AuthContextType = {
    auth: Auth;
    setAuth: Dispatch<SetStateAction<Auth>>;
};

const initialAuth = {
    isAuth: false,
};

const AuthContext = createContext<AuthContextType | null>(null);

/// Provider
export const AuthContextProvider = ({ children }: { children?: ReactNode }) => {
    const [auth, setAuth] = useState<Auth>(initialAuth);

    useEffect(()=>{
        if (auth.isAuth) {
            redirect('/')
        } 
        // else {
        //     redirect('/auth/login')
        // }
    },[auth])

    return (
        <AuthContext.Provider value={{ auth, setAuth }}>
            {children}
        </AuthContext.Provider>
    );
};
export default AuthContext;

/// custom hook
export const useAuthContext = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error(
            "useAuthContext must be used within a AuthContextProvider "
        );
    }
    return context;
};
