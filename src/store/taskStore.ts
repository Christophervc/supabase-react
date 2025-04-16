import { Task } from "../types/task";
import { create } from "zustand";
import { supabase } from "../supabase/client";

interface TaskState {
  tasks: Task[];
  addTask: (task: Omit<Task, "id" | "created_at" | "completed">) => void;
  updateTask: (
    taskId: number,
    updates: Partial<Omit<Task, "id" | "created_at">>
  ) => void;
  deleteTask: (taskId: number) => void;
  getTasks: () => Promise<void>;
}

export const useTaskStore = create<TaskState>((set, get) => ({
  tasks: [],

  addTask: async (newTask: Omit<Task, "id" | "created_at" | "completed">) => {},

  updateTask: async (
    taskId: number,

    updates: Partial<Omit<Task, "id" | "created_at">>
  ) => {},

  deleteTask: async (taskId: number) => {},

  getTasks: async () => {

    const {data:{user}} = await supabase.auth.getUser();
    
    const { data, error } = await supabase.from("tasks").select().eq("user_id", user?.id).order("id", { ascending: true });

    console.log (data);

    if (error) {
      console.error("Error fetching tasks:", error);
      return;
    }
    set({ tasks: data || [] });
  },
}));
