export interface Task {
  id: number;
  name: string;
  description: string;
  createdAt: Date;
  dueDate: Date;
  priority: "HIGH" | "MEDIUM" | "LOW";
  completed: boolean;
  userId: number;
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
  name?: string;
  description?: string;
  dueDate?: Date;
  priority?: Priority;
  completed?: boolean;
}
