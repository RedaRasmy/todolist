import { Input } from "@/components/ui/input";
import { Plus } from "lucide-react";
import React, { useState } from "react";

export default function NewTodoInput() {

    const [todo, setTodo] = useState("");

    return (
        <div className=" flex items-center justify-between w-full gap-2">
            <div className="w-full">
                <Input
                    value={todo}
                    onChange={(e) => setTodo(e.target.value)}
                    placeholder="Add new Todo..."
                />
            </div>
            <Plus
                className="cursor-pointer border-2 size-8 stroke-[3px] border-blue-800 rounded-md "
                // onClick={onAdd}
            />
        </div>
    );
}
