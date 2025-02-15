"use client";
import ToRegister from "./ToRegister";
import { Form, SubmitFunction } from "../components/Form";
import getAuthErrorMessage from "../utils/getAuthErrorMessage";
import axios from "@/app/api/axios";
import { useAuthContext } from "@/app/context/AuthContextProvider";

type LoginRes = {
    accessToken : string
}

export default function LoginPage() {
    const { setAuth } = useAuthContext()
    
    const handleSubmit: SubmitFunction = async (data, setError) => {
        try {
            const res = await axios.post<LoginRes>("/auth/login", JSON.stringify(data), {
                headers: {
                    "Content-Type": "application/json",
                },
                withCredentials: true,

            });
            const accessToken = res.data.accessToken
            // i need to store token
            console.log("this is login response : ", res)
            // token : res.data.accessToken
            // typi zmr
            // console.log("token : ", res.data?.accessToken)

            setAuth({
                username:data.username,
                accessToken,
                isAuth: true
            })
            return res;
        } catch (err) {
            const message = getAuthErrorMessage(err);
            setError("username", { 
                message,
            });
            return err;
        }
    };

    return (
        <div className="w-full">
            <ToRegister />
            <Form
                title="Welcome Back"
                buttonText="Sign in"
                onSub={handleSubmit}
            />
        </div>
    );
}
