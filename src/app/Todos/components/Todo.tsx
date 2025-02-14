import { Checkbox } from "@/components/ui/checkbox";
import { Delete } from "lucide-react";
import { useId } from "react";

export type TodoType = {
    task: string;
    checked: boolean;
};
type TodoProps = {
    onDelete?: () => void;
    onChangeTask?: () => void;
    onToggle?: () => void;
} & TodoType;

export default function Todo({
    task,
    checked,
    onDelete,
    // onChangeTask,
    onToggle,
}: TodoProps) {
    const id = useId();

    return (
        <div className="flex items-center justify-between">
            <div className="flex justify-center gap-4">
                <Checkbox
                    id={id}
                    checked={checked}
                    onCheckedChange={onToggle}
                />
                <label htmlFor={id}>{task}</label>
            </div>
            <Delete onClick={onDelete} />
        </div>
    );
}
