'use client'
import { Form, } from "../components/Form";
import ToLogin from "./ToLogin";
import useRegister from "./useRegister";

export default function RegisterPage() {
    const handleRegister = useRegister()

    return (
        <div 
        className="w-full h-full flex justify-center items-center"
        >
            <ToLogin/>
            <Form 
            title="Welcome to Todos"
            buttonText="Sign up" 
            onSub={handleRegister}
            />
        </div>
    )
}
