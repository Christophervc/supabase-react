import { useEffect } from "react";
import { useTaskStore } from "../store/task.store";
import TaskCard from "./TaskCard";
import { Spinner } from "./ui/spinner";
import { NotebookPenIcon } from "lucide-react";

const TaskList = ({ completed = false }) => {
  const { tasks, getTasks, loading } = useTaskStore();

  useEffect(() => {
    getTasks(completed);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [completed]);

  function RenderTaskList() {
    if (loading) {
      return (
        <div className="flex justify-center items-center">
          <Spinner size={"medium"} className="h-10 w-10 text-indigo-600" />
        </div>
      );
    } else if (tasks.length === 0) {
      return (
        <div className="flex flex-col justify-center items-center gap-2 py-10">
          <NotebookPenIcon className="h-10 w-10 text-slate-400" />
          <p className="text-lg text-slate-400 font-medium">
            No tasks yet, please add one
          </p>
        </div>
      );
    } else {
      return (
        <div className="grid gap-3">
          {tasks.map((task) => (
            <TaskCard
              key={task.id}
              id={task.id}
              name={task.name}
              description={task.description}
              completed={task.completed}
              user_id={task.user_id}
            />
          ))}
        </div>
      );
    }
  }

  return <>{RenderTaskList()}</>;
};

export default TaskList;
