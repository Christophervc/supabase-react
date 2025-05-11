import { Task } from "../types/task";
import { useTaskStore } from "../store/task.store";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "./ui/button";
import { Trash } from "lucide-react";

const TaskCard = (task: Task) => {
  //const [editing, setEditing] = useState(false)
  const { deleteTask, toggleTask } = useTaskStore();

  const handleDelete = () => {
    deleteTask(task.id);
  };

  const handleToggleTask = () => {
    toggleTask(task.id, { completed: !task.completed });
  };

  return (
    <>
      <Card>
        <CardHeader className="flex flex-row justify-between">
          <CardTitle
            className={`text-bold ${
              task.completed ? "line-through text-muted-foreground" : ""
            }`}
          >
            {task.name}
          </CardTitle>
          <CardDescription>
            {task.completed ? "Completed" : "Not Completed"}
          </CardDescription>
        </CardHeader>
        {task.description && (
          <CardContent
            className={`text-sm ${
              task.completed ? "line-through text-muted-foreground" : ""
            }`}
          >
            {task.description}
          </CardContent>
        )}

        <CardFooter className="flex flex-row justify-end gap-2">
          <Button
            variant={"secondary"}
            size={"sm"}
            className="cursor-pointer"
            onClick={() => handleToggleTask()}
          >
            {task.completed ? "Undo" : "Done"}
          </Button>

          <Button
            variant="destructive"
            className="cursor-pointer"
            size={"sm"}
            onClick={() => handleDelete()}
          >
            <Trash className="w-4 h-4" />
            Delete
          </Button>
        </CardFooter>
      </Card>
    </>
  );
};

export default TaskCard;
