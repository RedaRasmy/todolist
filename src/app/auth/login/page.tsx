"use client";
import ToRegister from "./ToRegister";
import { Form } from "../components/Form";
import useLogin from "./useLogin";


export default function LoginPage() {
    const handleLogin = useLogin()

    return (
        <div className="w-full">
            <ToRegister />
            <Form
                title="Welcome Back"
                buttonText="Sign in"
                onSub={handleLogin}
            />
        </div>
    );
}
