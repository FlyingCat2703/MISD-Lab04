import styles from './TaskBoard.module.css';
import type { Task } from '../../types/Task';
import { useState, useEffect } from 'react';
import { CiCalendar } from "react-icons/ci";

function TaskBoard()
{
    const [tasks, setTasks] = useState<Task[]>([]);

    useEffect(() => {
    const mockTasks: Task[] = [
      {
        id: 1,
        title: "Thiết kế giao diện Kanban",
        dueDate: "2025-11-15",
        status: "Pending",
        priority: "Low"
      },
      {
        id: 2,
        title: "Tạo API TaskController",
        dueDate: "2025-11-16",
        status: "In Progress",
        priority: "Low"
        
      },
      {
        id: 3,
        title: "Test API với Postman",
        dueDate: "2025-11-18",
        status: "Completed",
        priority: "High"
      },
      {
        id: 4,
        title: "Fix lỗi kết nối MySQL",
        dueDate: "2025-11-19",
        status: "Cancelled",
        priority: "Low"
      },
      {
        id: 5,
        title: "Thêm tính năng lọc trạng thái",
        dueDate: "2025-11-20",
        status: "Pending",
        priority: "Medium"
      },
      {
        id: 6,
        title: "Cập nhật README hướng dẫn chạy app",
        dueDate: "2025-11-22",
        status: "In Progress",
        priority: "Medium"
      },
    ];

    setTasks(mockTasks);
  }, []);

    const columns = [
        { title: "Pending", key: "Pending" },
        { title: "In Progress", key: "In Progress" },
        { title: "Completed", key: "Completed" },
        { title: "Cancelled", key: "Cancelled" },
    ];

    return (
        <div className={styles['board']}>
            {columns.map((col) => (
                <div className={styles['column']}>
                    <h3 className={`${styles['column-title']} ${styles[col.key.replace(' ', '').toLowerCase()]}`}>
                        { col.title }
                    </h3>

                    <div className={styles['task-list']}>
                        {tasks
                            .filter(t => t.status === col.key)
                            .map((task) => (
                                <div key={task.id} className={styles['task-card']}>
                                    <h4>{task.title}</h4>
                                    <CiCalendar /> {new Date(task.dueDate).toLocaleDateString()}
                                </div>
                            ))}
                    </div>
                </div>
            ))}
        </div>
    );
}

export default TaskBoard;