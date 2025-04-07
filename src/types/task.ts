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
