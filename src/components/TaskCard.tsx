import { Task } from "../types/task";
import { useTaskStore } from "../store/taskStore";

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
  const { deleteTask, updateTask } = useTaskStore();

  const handleDelete = () => {
    deleteTask(task.id);
  };

  const handleUpdate = () => {
    updateTask(task.id, { completed: !task.completed });
  };

  return (
    <>
      <Card>
        <CardHeader className="flex flex-row justify-between">
          <CardTitle className="text-bold">{task.name}</CardTitle>
          <CardDescription>
            {task.completed ? "Completed" : "Not Completed"}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p>Task Description</p>
        </CardContent>
        <CardFooter className="flex flex-row gap-3">
          <Button className="cursor-pointer" onClick={() => handleUpdate()}>
            {task.completed ? "Undo" : "Done"}
          </Button>
          <Button variant="destructive" className="cursor-pointer"  onClick={() => handleDelete()}>
            <Trash className="w-4 h-4 mr-1" />
            Delete
          </Button>
        </CardFooter>
      </Card>
    </>
  );
};

export default TaskCard;
