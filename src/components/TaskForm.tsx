import { useState } from "react";
import { useTaskStore } from "../store/taskStore";

const TaskForm = () => {
  
  const addTask = useTaskStore((state) => state.addTask);

  const [newTask, setNewTask] = useState<string>("");
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    addTask({name: newTask});
    setNewTask("");
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
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
        />
        <button type="submit">Add Task</button>
      </form>
    </>
  );
};

export default TaskForm;
