import { useEffect } from "react";
import { useTaskStore } from "../store/taskStore";

const TaskList = () => {
  const { tasks, getTasks } = useTaskStore();

  useEffect(() => {
    getTasks();
  }, []);

  return (
    <>
      {tasks.length > 0 ? (
        <ul>
          {tasks.map((task) => (
            <li key={task.id}>
              <span>{task.name}</span><br/>
              <span>{task.completed ? "Completed" : "Not Completed"}</span>
            </li>
          ))}
        </ul>
      ) : (
        <p>No pending Tasks!!</p>
      )}
    </>
  );
};

export default TaskList;
