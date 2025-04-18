import { supabase } from "../supabase/client";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import TaskForm from "../components/TaskForm";
import TaskList from "../components/TaskList";

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
      <div>Hello</div>
      <button onClick={() => supabase.auth.signOut()}> Log out</button>
      <TaskForm />
      <label>Pending tasks</label>
      <button
        onClick={() => {
          setShowCompletedTask(!showcompletedTask);
        }}
      >
        show completed
      </button>
      <TaskList completed={showcompletedTask} />
    </>
  );
};

export default Home;
