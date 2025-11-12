export type TaskStatus = "Pending" | "In Progress" | "Completed" | "Cancelled";
export type Priority = "Low" | "Medium" | "High";

export interface Task {
    id: number;
    title: string;
    dueDate: string;
    status: TaskStatus;
    priority: Priority;
}

export interface TaskDetail {
    id: number;
    title: string;
    description: string;
    createdAt: string;
    status: TaskStatus;
    priority: Priority;
}