'use client'
import React from "react";
import ToRegister from "./ToRegister";
import { Form, SubmitFunction } from "../components/Form";

export default function page() {
    const handleSubmit: SubmitFunction = async (data,setError) => {
        // use api
    }

    return <div className="w-full">
        <ToRegister/>
        <Form
        title="Welcome Back" 
        buttonText="Sign in" 
        onSub={handleSubmit}
        />
    </div>;
}
