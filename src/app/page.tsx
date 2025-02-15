'use client'
import { useAuthContext } from "./context/AuthContextProvider";
import TodoList from "./Todos/components/TodoList";

export default function Home() {
    const {auth} = useAuthContext()

    console.log(auth)

    return (
        <div>
            <TodoList/>
        </div>
    )
}
