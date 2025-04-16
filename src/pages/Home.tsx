
import { supabase } from "../supabase/client";
import { useEffect } from "react";
import { useNavigate } from "react-router";
import TaskForm from "../components/TaskForm";
import TaskList from "../components/TaskList";

const Home = () => {
const navigate = useNavigate();

  useEffect( () => {
    const user =  supabase.auth.getUser();
    if ( user == null) {
      navigate("/login");
    }
  }, [navigate]);

  return (
    <>
      <div>Hello</div>
      <button onClick={() => supabase.auth.signOut()}> Log out</button>
      <TaskForm/>
      <TaskList/>
    </>
  );
};

export default Home;
