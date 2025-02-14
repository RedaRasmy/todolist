import { useEffect, useState } from "react";
import Todo, { TodoType } from "./Todo";
import useRefreshToken from "@/app/auth/hooks/useRefreshToken";
import axios from "@/app/api/axios";

type GetTodosRes = (TodoType & { username: string })[];

export default function TodoList() {
    const [todos, setTodos] = useState<GetTodosRes>();
    const refresh = useRefreshToken();

    useEffect(() => {
        const controller = new AbortController();

        const getTodos = async () => {
            try {
                const res = await axios.get<GetTodosRes>("/todos", {
                    // signal : controller.signal
                });
                setTodos(res.data);
            } catch (err) {
                console.log(err);
            }
        };
    });

    return <div>
        {todos && todos.map((todo) => 
            <Todo
                key={todo.task+todo.checked}
                task={todo.task}
                checked={todo.checked}
            />
            )}
    </div>;
}
