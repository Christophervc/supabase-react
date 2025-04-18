import { useEffect } from "react";
import { useTaskStore } from "../store/taskStore";
import TaskCard from "./TaskCard";

const TaskList = () => {
  const { tasks, getTasks } = useTaskStore();

  useEffect(() => {
    getTasks();
  }, []);

  return (
    <>
      {tasks.length > 0 ? (
        <div style={{ display: "flex", flexDirection: "column",  gap: "10px", marginTop: "10px" }}>
          {tasks.map((task) => (
              <TaskCard key={task.id} id={task.id} name={task.name} completed={task.completed} user_id={task.user_id}/>
          ))}
        </div>
      ) : (
        <p>No pending Tasks!!</p>
      )}
    </>
  );
};

export default TaskList;
