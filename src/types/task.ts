export type Priority = "low" | "medium" | "high";
export type Status = "todo" | "in_progress" | "done";

export interface Task {
  id: string;
  title: string;
  description?: string;
  completed: boolean;
  priority: Priority;
  status: Status;
  category: string;
  dueDate?: string;
  createdAt: string;
  updatedAt: string;
}

export type FilterStatus = "all" | "active" | "completed";
export type FilterPriority = "all" | Priority;
