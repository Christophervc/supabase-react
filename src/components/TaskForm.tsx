import { useState } from "react";
import { supabase } from "../supabase/client";

const TaskForm = () => {
  
  const [task, setTask] = useState<string>("");
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const {data:{user}} = await supabase.auth.getUser();

      if (!user) {
        console.error("User not authenticated, please log in.");
        return;
      }

      const result = await supabase.from("tasks").insert({
        name: task,
        user_id: user?.id,
      });
      
      console.log("Task added successfully", result);
    } catch (error) {
      console.error("Error adding task:", error);
    }
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
          value={task}
          onChange={(e) => setTask(e.target.value)}
        />
        <button type="submit">Add Task</button>
      </form>
    </>
  );
};

export default TaskForm;
