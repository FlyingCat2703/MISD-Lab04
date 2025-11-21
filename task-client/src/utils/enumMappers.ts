import type { TaskStatus, Priority } from "../types/Task";

// Map backend number to TaskStatus string
export const mapTaskStatus = (status: number | TaskStatus): TaskStatus => {
    if (typeof status === "string") return status;
    
    switch (status) {
        case 0: return "Pending";
        case 1: return "In Progress";
        case 2: return "Completed";
        case 3: return "Cancelled";
        default: return "Pending";
    }
};

// Map TaskStatus string to backend number
export const mapTaskStatusToNumber = (status: TaskStatus): number => {
    switch (status) {
        case "Pending": return 0;
        case "In Progress": return 1;
        case "Completed": return 2;
        case "Cancelled": return 3;
        default: return 0;
    }
};

// Map backend number to Priority string
export const mapPriority = (priority: number | Priority): Priority => {
    if (typeof priority === "string") return priority;
    
    switch (priority) {
        case 1: return "Low";
        case 2: return "Medium";
        case 3: return "High";
        default: return "Medium";
    }
};

// Map Priority string to backend number
export const mapPriorityToNumber = (priority: Priority): number => {
    switch (priority) {
        case "Low": return 1;
        case "Medium": return 2;
        case "High": return 3;
        default: return 2;
    }
};
