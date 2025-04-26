import { useEffect } from "react";
import { useTaskStore } from "../store/taskStore";
import TaskCard from "./TaskCard";

const TaskList = ({completed=false}) => {
  const { tasks, getTasks } = useTaskStore();

  useEffect(() => {
    getTasks(completed);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [completed]);

  return (
    <>
      {tasks.length > 0 ? (
        <div className="grid gap-3">
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
