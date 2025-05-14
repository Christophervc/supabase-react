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
import { MoreVertical} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { useState } from "react";
import UpdateTaskDialog from "./UpdateTaskDialog";

const TaskCard = (task: Task) => {
  const [isUpdateOpen, setIsUpdateOpen] = useState(false);
  const { deleteTask, toggleTask, updateTask } = useTaskStore();

  const handleDelete = () => {
    deleteTask(task.id);
  };

  const handleToggleTask = () => {
    toggleTask(task.id, { completed: !task.completed });
  };

  const handleUpdateTask = async (name: string, description: string) => {
    await updateTask(task.id, name, description);
    setIsUpdateOpen(false);
  };

  return (
    <>
      <Card>
        <CardHeader className="flex flex-row justify-between items-center">
          <CardTitle
            className={`text-bold ${
              task.completed ? "line-through text-muted-foreground" : ""
            }`}
          >
            {task.name}
          </CardTitle>
          <CardDescription className="flex flex-row gap-1 items-center">
            <Button
              variant={"ghost"}
              size={"sm"}
              className="cursor-pointer"
              onClick={() => handleToggleTask()}
            >
              {task.completed ? "Undo" : "Done"}
            </Button>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <MoreVertical className="h-4 w-4" />
                  <span className="sr-only">Open menu</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => setIsUpdateOpen(true)}>
                  Update
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => handleDelete()}
                  className="text-destructive"
                >
                  Delete
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
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

        <CardFooter className="flex flex-row justify-end gap-2 text-sm">
          {/*task.completed ? "Completed" : "Not Completed"*/}
          {/* 
          <Button
            variant="destructive"
            className="cursor-pointer"
            size={"sm"}
            onClick={() => handleDelete()}
          >
            <Trash className="w-4 h-4" />
            Delete
          </Button>
          */}
        </CardFooter>
      </Card>

      <UpdateTaskDialog
        task={task}
        open={isUpdateOpen}
        onOpenChange={setIsUpdateOpen}
        onUpdate={(name, description) => {
          handleUpdateTask(name, description);
        }}
      />
    </>
  );
};

export default TaskCard;
