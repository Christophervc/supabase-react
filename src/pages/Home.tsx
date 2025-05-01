import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { supabase } from "@/supabase/client";
import { Button } from "@/components/ui/button";
import TopNav from "@/components/TopNav";
import TaskForm from "../components/TaskForm";
import TaskList from "../components/TaskList";

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

  return (
    <>
      <main className="container mx-auto px-4 py-4">
        <TopNav />
        <div className="grid grid-cols-1 gap-4 md:mx-auto md:max-w-3/5  xl:max-w-2/5 py-4 ">
          <TaskForm />
          <div className="flex justify-center">
            <Button
              variant="ghost"
              className="cursor-pointer text-indigo-600  hover:text-indigo-500  font-bold"
              onClick={() => setShowCompletedTask(!showcompletedTask)}
            >
              {showcompletedTask
                ? "Show pending tasks"
                : "Show completed tasks"}
            </Button>
          </div>
          <TaskList completed={showcompletedTask} />
        </div>
      </main>
    </>
  );
};

export default Home;
