import { useMemo } from "react";
import api from "./api";
import { CreateTaskDto, UpdateTaskDto } from "@/types/task";

export function useTaskService() {
  const services = useMemo(() => {
    return {
      getTasks: async () => {
        return api.get("/task");
      },
      getTask: async (id: number) => {
        return api.get(`/task/${id}`);
      },
      createTask: async (task: CreateTaskDto) => {
        return api.post("/task", task);
      },
      updateTask: async (id: number, task: UpdateTaskDto) => {
        return api.patch(`/task/${id}`, task);
      },
      deleteTask: async (id: number) => {
        return api.delete(`/task/${id}`);
      },
      adminGetTasks: async () => {
        return api.get("/task/admin");
      },
    };
  }, []);
  return services;
}
