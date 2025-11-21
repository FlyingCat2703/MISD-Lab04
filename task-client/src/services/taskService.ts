import api from "./axiosConfig";
import type { Task, TaskFilter } from "../types/Task";
import { mapTaskStatus, mapTaskStatusToNumber, mapPriority, mapPriorityToNumber } from "../utils/enumMappers";

interface PagedResult<T> {
    items: T[];
    total: number;
    page: number;
    size: number;
}

interface CreateTaskDTO {
    title: string;
    description?: string;
    dueDate: string;
    status: string;
    priority: string;
}

interface UpdateTaskDTO {
    title?: string;
    description?: string;
    dueDate?: string;
    status?: string;
    priority?: string;
}

const taskService = {
    getTasks: async (params?: TaskFilter): Promise<PagedResult<Task>> => {
        try {
            const res = await api.get("/tasks/filter", { params });
            const data = res.data;
            data.items = data.items.map((task: any) => ({
                ...task,
                status: mapTaskStatus(task.status),
                priority: mapPriority(task.priority)
            }));
            return data;
        } catch (error) {
            console.error("Error fetching tasks", error);
            throw error;
        }
    },

    createTask: async (task: CreateTaskDTO): Promise<Task> => {
        try {
            const payload = {
                ...task,
                status: mapTaskStatusToNumber(task.status as any),
                priority: mapPriorityToNumber(task.priority as any)
            };
            const res = await api.post("/tasks/create", payload);
            const data = res.data;
            return {
                ...data,
                status: mapTaskStatus(data.status),
                priority: mapPriority(data.priority)
            };
        } catch (error) {
            console.error("Error creating task", error);
            throw error;
        }
    },

    updateTask: async (id: number, task: UpdateTaskDTO): Promise<Task> => {
        try {
            const payload = {
                id,
                ...task,
                status: task.status ? mapTaskStatusToNumber(task.status as any) : undefined,
                priority: task.priority ? mapPriorityToNumber(task.priority as any) : undefined
            };
            const res = await api.put(`/tasks/update`, payload);
            const data = res.data;
            return {
                ...data,
                status: mapTaskStatus(data.status),
                priority: mapPriority(data.priority)
            };
        } catch (error) {
            console.error("Error updating task", error);
            throw error;
        }
    },

    deleteTask: async (id: number): Promise<void> => {
        try {
            await api.delete(`/tasks/delete`, {params : {id : id}});
        } catch (error) {
            console.error("Error deleting task", error);
            throw error;
        }
    },

    getTaskById: async (id: number): Promise<Task> => {
        try {
            const res = await api.get(`/tasks/${id}`);
            const data = res.data;
            return {
                ...data,
                status: mapTaskStatus(data.status),
                priority: mapPriority(data.priority)
            };
        } catch (error) {
            console.error("Error fetching task", error);
            throw error;
        }
    }
}

export default taskService;