'use client'
import { useAuthContext } from "./context/AuthContextProvider";
import Header from "./Todos/components/Header";
import NewTodoInput from "./Todos/components/NewTodoInput";
import TodoList from "./Todos/components/TodoList";

export default function Home() {
    const {auth} = useAuthContext()

    console.log(auth)

    return (
        <div className="flex flex-col justify-center items-center h-[100dvh]">
            <Header/>
            <div className="w-[min(90%,500px)] h-full flex flex-col p-10">
                <NewTodoInput/>
                <TodoList/>
            </div>
        </div>
    )
}
