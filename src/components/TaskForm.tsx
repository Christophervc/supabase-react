import { useState } from "react";
import { useTaskStore } from "../store/task.store";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";

const TaskForm = () => {
  const addTask = useTaskStore((state) => state.addTask);

  const [newTask, setNewTask] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    if (newTask.trim() === "") return;
    e.preventDefault();
    addTask({ 
      name: newTask,
      description: description,
    });
    setNewTask("");
    setDescription("");
  };

  return (
      <Card>
        <CardHeader>
          <CardTitle>Add New Task</CardTitle>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col gap-4">
            <CardContent className="flex flex-col gap-4">
              <Input
                id="task-name"
                placeholder="Enter task name"
                value={newTask}
                onChange={(e) => setNewTask(e.target.value)}
                required
              />
              <Textarea
                id="task-description"
                className="resize-none"
                placeholder="Task description (optional)"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </CardContent>
            <CardFooter>
              <Button variant={"primary"} type="submit" className="w-full cursor-pointer">
                Add Task
              </Button>
            </CardFooter>
          </div>
        </form>
      </Card>
    
  );
};

export default TaskForm;
