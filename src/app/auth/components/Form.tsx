"use client";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { SubmitHandler, useForm, UseFormSetError } from "react-hook-form";

export type FormFields = {
    username: string;
    password: string;
};
export type SubmitFunction = (data: FormFields, setError: UseFormSetError<FormFields>) => Promise<unknown>

export function Form({
    onSub,
    buttonText,
    title,
}: {
    onSub?: SubmitFunction ;
    buttonText: string;
    title: string;
}) {
    const {
        register,
        handleSubmit,
        setError,
        formState: { errors, isSubmitting },
    } = useForm<FormFields>();

    const onSubmit: SubmitHandler<FormFields> = async (data) => {
        if (onSub) {
            await onSub(data, setError);
        }
    };

    const error = errors.username ?
    errors.username.message
    :errors.password?.message

    console.log(error)

    return (
        <div className="max-w-md w-full mx-auto rounded-none md:rounded-2xl p-4 md:p-8 shadow-input bg-white dark:bg-black">
            <h2 className="font-bold text-xl text-neutral-800 dark:text-neutral-200">
                {title}
            </h2>
            <p className="text-red-600 max-w-sm mt-2">
                {error}
            </p>

            <form
                className="my-8"
                onSubmit={handleSubmit(onSubmit)}
            >
                <LabelInputContainer className="mb-4">
                    <Label htmlFor="email">Username</Label>
                    <Input
                        {...register("username", {
                            required: "Username is required",
                        })}
                        id="username"
                        placeholder="Enter your username"
                        type="text"
                    />
                </LabelInputContainer>
                <LabelInputContainer className="mb-4">
                    <Label htmlFor="password">Password</Label>
                    <Input
                        {...register("password", {
                            required: "Password is required",
                            minLength: {
                                value: 8,
                                message:
                                    "Password must have at least 8 characters ",
                            },
                        })}
                        id="password"
                        placeholder="••••••••"
                        type="password"
                    />
                </LabelInputContainer>

                <button
                    className="bg-gradient-to-br mt-10 relative group/btn from-black 
                    dark:from-zinc-900 dark:to-zinc-900 to-neutral-600 block 
                    dark:bg-zinc-800 w-full text-white rounded-md h-10 font-medium 
                    shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] 
                    dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]
                    disabled:opacity-40
                    "
                    type="submit"
                    disabled={isSubmitting}
                >
                    {buttonText} &rarr;
                    <BottomGradient />
                </button>

                {/* <div className="bg-gradient-to-r from-transparent via-neutral-300 dark:via-neutral-700 to-transparent my-8 h-[1px] w-full" /> */}
            </form>
        </div>
    );
}

const BottomGradient = () => {
    return (
        <>
            <span className="group-hover/btn:opacity-100 block transition duration-500 opacity-0 absolute h-px w-full -bottom-px inset-x-0 bg-gradient-to-r from-transparent via-cyan-500 to-transparent" />
            <span className="group-hover/btn:opacity-100 blur-sm block transition duration-500 opacity-0 absolute h-px w-1/2 mx-auto -bottom-px inset-x-10 bg-gradient-to-r from-transparent via-indigo-500 to-transparent" />
        </>
    );
};

const LabelInputContainer = ({
    children,
    className,
}: {
    children: React.ReactNode;
    className?: string;
}) => {
    return (
        <div className={cn("flex flex-col space-y-2 w-full", className)}>
            {children}
        </div>
    );
};
