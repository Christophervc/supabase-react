import { Task } from "../types/task";
import { create } from "zustand";
import { supabase } from "../supabase/client";

interface TaskState {
  tasks: Task[];
  addTask: (
    task: Omit<Task, "id" | "created_at" | "completed" | "user_id">
  ) => void;
  updateTask: (
    taskId: number,
    updates: Partial<Omit<Task, "id" | "created_at" | "user_id" | "name">>
  ) => void;
  deleteTask: (taskId: number) => void;
  getTasks: (completed?: boolean) => Promise<void>;
}

export const useTaskStore = create<TaskState>((set) => ({
  tasks: [],

  getTasks: async (completed = false) => {
    const {data: { user }} = await supabase.auth.getUser();

    const { data, error } = await supabase
      .from("tasks")
      .select()
      .eq("user_id", user?.id || "")
      .eq("completed", completed)
      .order("id", { ascending: true });

    console.log(data);

    if (error) {
      console.error("Error fetching tasks:", error);
      return;
    }
    set({ tasks: data || [] });
  },

  addTask: async (
    newTask: Omit<Task, "id" | "created_at" | "completed" | "user_id">
  ) => {
    const { data } = await supabase.auth.getUser();
    const { user } = data;
    if (!user) {
      console.error("User not authenticated, please log in.");
      return;
    }

    try {
      /*const {data: { user },} = await supabase.auth.getUser();*/
      const { data: insertedData, error } = await supabase
        .from("tasks")
        .insert({
          name: newTask.name,
          user_id: user?.id,
        })
        .select();

      if (error) throw error;

      if (insertedData && insertedData.length > 0) {
        console.log("Task added successfully", insertedData[0]);
        set((state) => ({
          tasks: [...state.tasks, { ...insertedData[0], completed: false }],
        }));
      }
    } catch (error) {
      console.error("Error adding task:", error);
    }
  },

  updateTask: async (
    taskId: number,
    updates: Partial<Omit<Task, "id" | "created_at" | "user_id" | "name">>
  ) => {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    const { error } = await supabase
      .from("tasks")
      .update(updates)
      .eq("user_id", user?.id || "")
      .eq("id", taskId)
      .select();
    if (error) throw error;

    set((state) => ({
      tasks: state.tasks.filter((task) => task.id !== taskId)
    }));
  },

  deleteTask: async (taskId: number) => {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    const { error } = await supabase
      .from("tasks")
      .delete()
      .eq("user_id", user?.id || "")
      .eq("id", taskId)
      .select();

    if (error) {
      console.error("Error deleting task:", error);
      return;
    }

    set((state) => ({
      tasks: state.tasks.filter((task) => task.id !== taskId),
    }));
  },
}));
