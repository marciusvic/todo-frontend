import { useTaskService } from "@/services/task-service";
import { CreateTaskDto, Task, UpdateTaskDto } from "@/types/task";
import { createContext, useContext, useEffect, useState } from "react";
import { useAuth } from "./auth-context";

interface TaskContextType {
  tasks: Task[];
  fetchTasks: () => Promise<void>;
  loading: boolean;
  createNewTask: (task: CreateTaskDto) => Promise<void>;
  updateExistingTask: (id: number, task: UpdateTaskDto) => Promise<void>;
  deleteExistingTask: (id: number) => Promise<void>;
  adminTasks: Task[];
  fetchAdminTasks: () => Promise<void>;
}

export const TaskContext = createContext<TaskContextType>({
  tasks: [],
  fetchTasks: async () => {},
  loading: false,
  createNewTask: async () => {},
  updateExistingTask: async () => {},
  deleteExistingTask: async () => {},
  adminTasks: [],
  fetchAdminTasks: async () => {},
});

export default function TaskProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [adminTasks, setAdminTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const { adminGetTasks, createTask, deleteTask, getTasks, updateTask } =
    useTaskService();
  const { currentUser, isAuthenticated } = useAuth();

  async function fetchTasks() {
    setLoading(true);
    try {
      const response = await getTasks();
      const { data } = response;
      setTasks(data);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    } finally {
      setLoading(false);
    }
  }

  async function createNewTask(task: CreateTaskDto) {
    setLoading(true);
    try {
      const response = await createTask(task);
      const { data } = response;
      setTasks((prevTasks) => [...prevTasks, data]);
    } catch (error) {
      console.error("Error creating task:", error);
    } finally {
      setLoading(false);
    }
  }

  async function updateExistingTask(id: number, task: UpdateTaskDto) {
    setLoading(true);
    try {
      await updateTask(id, task);
    } catch (error) {
      console.error("Error updating task:", error);
    } finally {
      setLoading(false);
    }
  }

  async function deleteExistingTask(id: number) {
    setLoading(true);
    try {
      await deleteTask(id);
      setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
    } catch (error) {
      console.error("Error deleting task:", error);
    } finally {
      setLoading(false);
    }
  }

  async function fetchAdminTasks() {
    setLoading(true);
    try {
      const response = await adminGetTasks();
      const { data } = response;
      setAdminTasks(data);
    } catch (error) {
      console.error("Error fetching admin tasks:", error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (isAuthenticated && currentUser) {
      fetchTasks();
      if (currentUser.role === "ADMIN") {
        fetchAdminTasks();
      }
    }
  }, [isAuthenticated, currentUser]);

  return (
    <TaskContext.Provider
      value={{
        tasks,
        fetchTasks,
        loading,
        createNewTask,
        updateExistingTask,
        deleteExistingTask,
        adminTasks,
        fetchAdminTasks,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
}

export function useTask() {
  const context = useContext(TaskContext);
  if (!context) {
    throw new Error("useTask must be used within a TaskProvider");
  }
  return context;
}
