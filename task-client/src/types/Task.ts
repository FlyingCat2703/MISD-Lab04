export type TaskStatus = "Pending" | "In Progress" | "Completed" | "Cancelled";
export type Priority = "Low" | "Medium" | "High";

export interface Task {
    id: number;
    title: string;
    description?: string;
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

export interface TaskFilter {
    keyword?: string;
    status?: TaskStatus;
    priority?: Priority;
    startDate?: string;
    endDate?: string;
    page?: number;
    size?: number;
}