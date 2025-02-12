'use client'
import axios from "@/app/api/axios";
import { Form, SubmitFunction } from "../components/Form";
import ToLogin from "./ToLogin";
import getAuthErrorMessage from "../utils/getAuthErrorMessage";

export default function page() {
    const handleSubmit: SubmitFunction = async (data,setError) => {
        // use api
        try {
            console.log('fetching..')
            const res = await axios.post(
                "/auth/register",
                JSON.stringify(data),
                {
                    headers: {
                        'Content-Type' : "application/json",
                    },
                    withCredentials: true
                }
            )
            return res
        } catch (err) {
            const message = getAuthErrorMessage(err)
            setError('username',{
                message,
            })
            return err
        }
    }

    return (
        <div 
        className="w-full h-full flex justify-center items-center"
        >
            <ToLogin/>
            <Form 
            title="Welcome to Todos" 
            buttonText="Sign up" 
            onSub={handleSubmit}
            />
        </div>
    )
}
