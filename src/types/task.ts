import { User } from "./user";

export interface Task {
  id: number;
  title: string;
  description: string;
  createdAt: Date;
  dueDate: Date;
  priority: "HIGH" | "MEDIUM" | "LOW";
  completed: boolean;
  userId: number;
  User?: User;
}

export enum Priority {
  LOW = "LOW",
  MEDIUM = "MEDIUM",
  HIGH = "HIGH",
}

export interface CreateTaskDto {
  title: string;
  description: string;
  dueDate: Date;
  priority: Priority;
}

export interface UpdateTaskDto {
  title?: string;
  description?: string;
  dueDate?: Date;
  priority?: Priority;
  completed?: boolean;
}
