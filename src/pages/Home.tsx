import { supabase } from "../supabase/client";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import TaskForm from "../components/TaskForm";
import TaskList from "../components/TaskList";
import Header from "@/components/Header";
import { Label } from "@/components/ui/label";

const Home = () => {
  const navigate = useNavigate();

  const [showcompletedTask, setShowCompletedTask] = useState<boolean>(false);

  useEffect(() => {
    const user = supabase.auth.getUser();
    if (user == null) {
      navigate("/login");
    }
  }, [navigate]);

  return (
    <>
      <main className="container mx-auto  px-4  py-4">
        <Header />
        <div className="grid grid-cols-1 gap-4 lg:max-w-2/5 md:mx-auto py-4 ">
          <TaskForm />
          <div className="flex flex-row justify-evenly">
            <Label>Completed Tasks</Label>
            <Label
              className="cursor-pointer hover:border-b-2 hover:text-indigo-600"
              onClick={() => setShowCompletedTask(!showcompletedTask)}
            >
              {showcompletedTask
                ? "Show pending tasks"
                : "Show completed tasks"}
            </Label>
            {/* 
              <button
                className="border-0 bg-sky-500 text-white p-2 rounded-md"
                onClick={() => {
                  setShowCompletedTask(!showcompletedTask);
                }}
              >
                {showcompletedTask
                  ? "Show pending tasks"
                  : "Show completed tasks"}
              </button>
              */}
          </div>
          <TaskList completed={showcompletedTask} />
        </div>
      </main>
    </>
  );
};

export default Home;
