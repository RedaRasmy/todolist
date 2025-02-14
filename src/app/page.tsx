'use client'
import useAuth from "./auth/hooks/useAuth";
import TodoList from "./Todos/components/TodoList";

export default function Home() {
    const {auth} = useAuth()

    console.log(auth)
    return (
        <div>
            <TodoList/>
        </div>
    )
}
