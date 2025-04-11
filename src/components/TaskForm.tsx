import { useState } from "react";
import {supabase} from "../supabase/client";

const TaskForm = () => {
  const [Task, setTask] = useState<string>("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(Task);
    setTask("");
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <label htmlFor="task">Task</label>
        <input
          type="text"
          name="task"
          id="task"
          placeholder="Enter task"
          onChange={(e) => setTask(e.target.value)}
        />
        <button type="submit">Add Task</button>
      </form>
    </>
  );
};

export default TaskForm;
