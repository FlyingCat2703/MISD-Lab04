import { useState, useEffect } from "react";
import styles from "./TaskBoard.module.css";
import type { Task, TaskStatus } from "../../types/Task";
import Board from "../../components/Board/Board";

const mockTasks: Task[] = [
    {
        id: 1,
        title: "Design homepage mockup",
        dueDate: "2025-11-15",
        status: "Pending",
        priority: "High",
    },
    {
        id: 2,
        title: "Review API documentation",
        dueDate: "2025-11-16",
        status: "Pending",
        priority: "Medium",
    },
    {
        id: 3,
        title: "Implement authentication",
        dueDate: "2025-11-18",
        status: "In Progress",
        priority: "High",
    },
    {
        id: 4,
        title: "Test API with Postman",
        dueDate: "2025-11-20",
        status: "In Progress",
        priority: "Medium",
    },
    {
        id: 5,
        title: "Setup project repository",
        dueDate: "2025-11-10",
        status: "Completed",
        priority: "Low",
    },
    {
        id: 6,
        title: "Fix MySQL connection issue",
        dueDate: "2025-11-12",
        status: "Cancelled",
        priority: "High",
    },
];

function TaskBoard() {
    const [tasks, setTasks] = useState<Task[]>(mockTasks);

    const columns: TaskStatus[] = [
        "Pending",
        "In Progress",
        "Completed",
        "Cancelled",
    ];
    const [draggedTask, setDraggedTask] = useState<Task | null>(null);

    const handleDragStart = (
        e: React.DragEvent<HTMLDivElement>,
        task: Task
    ) => {
        setDraggedTask(task);
        e.dataTransfer.effectAllowed = "move";
        e.dataTransfer.setData("taskId", task.id.toString());
    };

    const handleDropTask = (task: Task, targetStatus: TaskStatus) => {
        setTasks((prev) =>
            prev.map((t) =>
                t.id === task.id ? { ...t, status: targetStatus } : t
            )
        );
        setDraggedTask(null);
    };

    const handleDeleteTask = (taskId: number) => {
        setTasks((prev) => prev.filter((t) => t.id !== taskId));
    };

    return (
        <div className={styles["kanban-board"]}>
            {columns.map((status) => (
                <Board
                    key={status}
                    status={status}
                    tasks={tasks.filter((t) => t.status === status)}
                    onDeleteTask={handleDeleteTask}
                    onDragStart={handleDragStart}
                    onDropTask={(task) => handleDropTask(task, status)}
                />
            ))}
        </div>
    );
}

export default TaskBoard;
