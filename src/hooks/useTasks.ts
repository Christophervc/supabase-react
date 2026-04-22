import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/supabase/client";
import { Task } from "@/types/task";

// hooks para obtener las tareas
export const useTasks = (completed: boolean = false) => {
  return useQuery({
    queryKey: ["tasks", completed],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("tasks")
        .select()
        .eq("completed", completed)
        .order("created_at", { ascending: false });

      if (error) throw new Error(error.message || "Error fetching tasks");
      return data as Task[];
    },
  });
};

// hooks para agrupar las mutaciones (crear, actualizar, eliminar, toggle)
export const useTaskMutations = () => {
  const queryClient = useQueryClient();
  // funcion para cuando la data cambie en la BD se actualice el query cache
  const invalidateTasks = () => {
    queryClient.invalidateQueries({ queryKey: ["tasks"] });
  };

  const addTask = useMutation({
    mutationFn: async (newTask: { name: string; description?: string }) => {
      const { data, error } = await supabase
        .from("tasks")
        .insert([newTask])
        .select();
      if (error) throw new Error(error.message);
      return data as Task[];
    },
    onSuccess: invalidateTasks,
  });

  const toggleTask = useMutation({
    mutationFn: async ({
      id,
      completed,
    }: {
      id: number;
      completed: boolean;
    }) => {
      const { data, error } = await supabase
        .from("tasks")
        .update({ completed })
        .eq("id", id)
        .select();
      if (error) throw new Error(error.message);
      return data;
    },
    onSuccess: invalidateTasks,
  });

  const updateTask = useMutation({
    mutationFn: async ({
      id,
      name,
      description,
    }: {
      id: number;
      name: string;
      description?: string;
    }) => {
      const { data, error } = await supabase
        .from("tasks")
        .update({ name, description })
        .eq("id", id)
        .select();
      if (error) throw new Error(error.message);
      return data;
    },
    onSuccess: invalidateTasks,
  });

  const deleteTask = useMutation({
    mutationFn: async (id: number) => {
      const { data, error } = await supabase
        .from("tasks")
        .delete()
        .eq("id", id)
        .select();
      if (error) throw new Error(error.message);
      return data;
    },
    onSuccess: invalidateTasks,
  });

  return {
    addTask: addTask.mutateAsync,
    isAddingTask: addTask.isPending,
    toggleTask: toggleTask.mutateAsync,
    updateTask: updateTask.mutateAsync,
    deleteTask: deleteTask.mutateAsync,
  };
};
