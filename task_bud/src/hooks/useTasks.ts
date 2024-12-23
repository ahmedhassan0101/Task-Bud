// src/hooks/useTasks.ts
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { taskService } from "../api/taskService";
import { toast } from "react-toastify";
import { TodoItem } from "../types";

// Query key constant
export const TASKS_QUERY_KEY = "tasks";

export const useTasks = () => {
  const queryClient = useQueryClient();

  // Query for fetching tasks
  const {
    data: tasks = [],
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: [TASKS_QUERY_KEY],
    queryFn: taskService.getAllTasks,
  });

  /!* ------------------------------------ - ----------------------------------- */;

  // Mutation for creating tasks
  const createTaskMutation = useMutation({
    mutationFn: taskService.createTask,
    onSuccess: (newTask) => {
      // Optimistically update the cache
      queryClient.setQueryData<TodoItem[]>([TASKS_QUERY_KEY], (old = []) => [
        ...old,
        newTask,
      ]);
      toast.success("Task created successfully");
    },
    onError: () => {
      toast.error("Failed to create task");
    },
  });

  /!* ------------------------------------ - ----------------------------------- */;

  // Mutation for updating tasks
  const updateTaskMutation = useMutation({
    mutationFn: ({ id, isDone }: { id: string; isDone: boolean }) =>
      taskService.updateTask(id, isDone),
    onMutate: async ({ id, isDone }) => {
      // Cancel outgoing refetches
      await queryClient.cancelQueries({ queryKey: [TASKS_QUERY_KEY] });

      // Snapshot the previous value
      const previousTasks = queryClient.getQueryData<TodoItem[]>([
        TASKS_QUERY_KEY,
      ]);

      // Optimistically update the cache
      queryClient.setQueryData<TodoItem[]>([TASKS_QUERY_KEY], (old = []) =>
        old.map((task) => (task.id === id ? { ...task, isDone } : task))
      );

      return { previousTasks };
    },
    onError: (_err, _variables, context) => {
      // Rollback on error
      if (context?.previousTasks) {
        queryClient.setQueryData([TASKS_QUERY_KEY], context.previousTasks);
      }
      toast.error("Failed to update task");
    },
    onSettled: () => {
      // Always refetch after error or success
      queryClient.invalidateQueries({ queryKey: [TASKS_QUERY_KEY] });
    },
  });

  /!* ------------------------------------ - ----------------------------------- */;

  // Mutation for deleting tasks
  const deleteTaskMutation = useMutation({
    mutationFn: taskService.deleteTask,
    onMutate: async (taskId) => {
      await queryClient.cancelQueries({ queryKey: [TASKS_QUERY_KEY] });
      const previousTasks = queryClient.getQueryData<TodoItem[]>([
        TASKS_QUERY_KEY,
      ]);

      queryClient.setQueryData<TodoItem[]>([TASKS_QUERY_KEY], (old = []) =>
        old.filter((task) => task.id !== taskId)
      );

      return { previousTasks };
    },
    onError: (_err, _variables, context) => {
      if (context?.previousTasks) {
        queryClient.setQueryData([TASKS_QUERY_KEY], context.previousTasks);
      }
      toast.error("Failed to delete task");
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: [TASKS_QUERY_KEY] });
    },
  });

  /!* ------------------------------------ - ----------------------------------- */;

  return {
    tasks,
    isLoading,
    isError,
    error,
    createTask: createTaskMutation.mutate,
    updateTask: updateTaskMutation.mutate,
    deleteTask: deleteTaskMutation.mutate,
  };
};
