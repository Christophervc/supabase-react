import { useState } from "react";
import { useTaskStore } from "../store/taskStore";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

const TaskForm = () => {
  const addTask = useTaskStore((state) => state.addTask);

  const [newTask, setNewTask] = useState<string>("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    addTask({ name: newTask });
    setNewTask("");
  };

  return (
    
      <Card>
        <CardHeader>
          <CardTitle>Add New Task</CardTitle>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col gap-4">
            <CardContent>
              <Input
                id="task-name"
                placeholder="Enter task name"
                value={newTask}
                onChange={(e) => setNewTask(e.target.value)}
                required
              />
            </CardContent>
            <CardFooter>
              <Button type="submit" className="w-full">
                Add Task
              </Button>
            </CardFooter>
          </div>
        </form>
      </Card>
    
  );
};

export default TaskForm;
