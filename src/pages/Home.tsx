import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import TaskForm from "../components/TaskForm";
import TaskList from "../components/TaskList";
import Header from "@/components/Header";
import { Label } from "@/components/ui/label";
import { supabase } from "@/supabase/client";
import { useAuthStore } from "@/store/authStore";

const Home = () => {
  const [showcompletedTask, setShowCompletedTask] = useState<boolean>(false);
  const navigate = useNavigate();

  useEffect(() => {
    supabase.auth.getUser().then(({ data: { user } }) => {
      if (!user) {
        navigate("/login");
      }
    });
  }, [navigate]);

  /**
  useEffect(() => {
    const user = supabase.auth.getUser();
    if (!user) {
      navigate("/login");
    }
  }, [navigate]); 
   */
  return (
    <>
      <main className="container mx-auto  px-4  py-4">
        <Header />
        <div className="grid grid-cols-1 gap-4 lg:max-w-2/5 md:mx-auto py-4 ">
          <TaskForm />
          <div className="flex flex-row justify-evenly">
            <Label
              className="cursor-pointer text-indigo-600 hover:border-b-2 hover:text-indigo-400 hover:underline-offset-1 font-bold"
              onClick={() => setShowCompletedTask(!showcompletedTask)}
            >
              {showcompletedTask
                ? "Show pending tasks"
                : "Show completed tasks"}
            </Label>
          </div>
          <TaskList completed={showcompletedTask} />
        </div>
      </main>
    </>
  );
};

export default Home;
