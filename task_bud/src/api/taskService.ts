import { axiosInstance } from './axios';
import { TodoItem } from '../types';

interface TaskResponse {
  taskList: TodoItem[];
}

interface SingleTaskResponse {
  task: TodoItem;
}

interface MessageResponse {
  msg: string;
}

export const taskService = {
  // Get all tasks
  getAllTasks: async () => {
    const response = await axiosInstance.get<TaskResponse>('/tasks');
    return response.data.taskList;
  },

  // Create a new task
  createTask: async (title: string) => {
    const response = await axiosInstance.post<SingleTaskResponse>('/tasks', { title });
    return response.data.task;
  },

  // Update task status
  updateTask: async (id: string, isDone: boolean) => {
    const response = await axiosInstance.patch<MessageResponse>(`/tasks/${id}`, { isDone });
    return response.data;
  },

  // Delete a task
  deleteTask: async (id: string) => {
    const response = await axiosInstance.delete<MessageResponse>(`/tasks/${id}`);
    return response.data;
  },
};