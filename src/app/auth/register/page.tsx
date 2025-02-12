'use client'
import { Form, SubmitFunction } from "../components/Form";
import ToLogin from "./ToLogin";

export default function page() {
    const handleSubmit: SubmitFunction = async (data,setError) => {
        // use api
        try {
            
        } catch (error) {
            // setError('')
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
