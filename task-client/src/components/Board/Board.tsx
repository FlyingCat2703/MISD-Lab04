import styles from './Board.module.css';
import TaskItem from '../TaskItem/TaskItem';
import React from 'react';
import type { Task } from '../../types/Task';

interface BoardProps {
    status: string;
    tasks: Task[],
    onDeleteTask: (taskId: number) => void;
    onDragStart: (e: React.DragEvent<HTMLDivElement>, task: Task) => void;
    onDropTask: (task: Task) => void;
}

function Board({status, tasks, onDeleteTask, onDragStart, onDropTask} : BoardProps)
{
    const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => e.preventDefault;
    const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault;
        const taskId = Number(e.dataTransfer.getData("taskId"));
        const task = tasks.find(t => t.id === taskId);
        if (task) onDropTask(task);
    };

    return (
        <div className={styles['board']}
            onDragOver={handleDragOver}
            onDrop={handleDrop}
        >
            <h2 className={styles['status']}>{status}</h2>
            <div className={styles['task-list']}>
                {tasks.map((task) => (
                    <TaskItem
                        key={task.id}
                        task={task}
                        onDelete={onDeleteTask}
                        onDragStart={(onDragStart)}
                    />
                ))}
            </div>
        </div>
    )
}

export default Board;