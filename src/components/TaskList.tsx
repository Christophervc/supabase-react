import { TaskCard } from "./TaskCard";
import { Spinner } from "./ui/spinner";
import { NotebookPenIcon } from "lucide-react";
import { useTasks } from "@/hooks/useTasks";

export const TaskList = ({ completed = false }) => {
  const { data: tasks, isLoading } = useTasks(completed);

  // 1. Estado de carga
  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-10">
        <Spinner size={"medium"} className="h-10 w-10 text-indigo-600" />
      </div>
    );
  }

  // 2. Estado vacio
  if (!tasks || tasks.length === 0) {
    return (
      <div className="flex flex-col justify-center items-center gap-2 py-10">
        <NotebookPenIcon className="h-10 w-10 text-slate-400" />
        <p className="text-lg text-slate-400 font-medium">
          No tasks yet, please add one
        </p>
      </div>
    );
  }

  //3. Estado con datos
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
};
