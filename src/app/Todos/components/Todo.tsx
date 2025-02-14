import { Checkbox } from "@/components/ui/checkbox";
import { Delete } from "lucide-react";
import { useId } from "react";
import TodoType from "../types/todo.type";


type TodoProps = {
    onDelete?: () => void;
    onChangeTask?: () => void;
    onToggle?: () => void;
} & Omit<TodoType,"_id">;

export default function Todo({
    task,
    checked,
    onDelete,
    // onChangeTask,
    onToggle,
}: TodoProps) {

    const id = useId();

    return (
        <div className="flex items-center justify-between max-w-96">
            <div className="flex items-center gap-4">
                <Checkbox
                    id={id}
                    checked={checked}
                    onCheckedChange={onToggle}
                />
                <label htmlFor={id}>{task}</label>
            </div>
            <Delete 
            className="text-red-600 cursor-pointer"
            onClick={onDelete} />
        </div>
    );
}
