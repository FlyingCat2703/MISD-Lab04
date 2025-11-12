import styles from './TaskItem.module.css';
import React from 'react';
import type { Task } from '../../types/Task';
import { FaGripVertical, FaRegTrashAlt } from "react-icons/fa";

interface TaskItemProps {
    task: Task;
    onDelete: (taskId: number) => void;
    onDragStart: (e: React.DragEvent<HTMLDivElement>, task: Task) => void;
}

function TaskItem({task, onDelete, onDragStart} : TaskItemProps)
{
    return (
        <div
            className={styles['task-card']}
            draggable
            onDragStart={(e) => onDragStart(e, task)}
        >
            <div className={styles['task-header']}>
                <FaGripVertical size={ 16 } />
                <h4 className={styles['task-title']}>
                    {task.title}
                </h4>
                <div
                    className={styles['delete-btn']}
                    onClick={() => onDelete(task.id)}
                >
                    <FaRegTrashAlt size={ 16 } />
                </div>
            </div>
        </div>
    );
}

export default TaskItem;