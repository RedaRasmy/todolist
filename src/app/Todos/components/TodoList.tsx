import { useEffect, useState } from "react";
import Todo from "./Todo";
// import useRefreshToken from "@/app/auth/hooks/useRefreshToken";
import axios from "@/app/api/axios";
import TodoType from "../types/todo.type";

export default function TodoList() {
    const [todos, setTodos] = useState<TodoType[]>();

    // const refresh = useRefreshToken();

    useEffect(() => {
        const controller = new AbortController();
        let isMounted = true
        const getTodos = async () => {
            try {
                const res = await axios.get<TodoType[]>("/todos", {
                    signal: controller.signal
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                } as any );
                if (isMounted) setTodos(res.data);


                console.log(res);
            } catch (err) {
                console.log(err);
            }
        };
        getTodos();

        return () => { 
            isMounted = false
            controller.abort()
        }
    },[]);

    return (
        <div className="p-5">
            {!!todos?.length ? (
                todos.map((todo) => (
                    <Todo
                        key={todo._id}
                        task={todo.task}
                        checked={todo.checked}
                    />
                ))
            ) : (
                <p>No Todos</p>
            )}
        </div>
    );
}
