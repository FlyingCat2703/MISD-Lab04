import { useState, useEffect } from "react";
import styles from "./TaskList.module.css";
import type { Task, TaskStatus, Priority } from "../../types/Task";
import { FaEdit, FaTrash, FaChevronLeft, FaChevronRight, FaTimes, FaFilter, FaCalendarAlt } from "react-icons/fa";
// import { IoAddOutline } from "react-icons/io5";
import taskService from "../../services/taskService";
import { formatDate, toDateInputValue } from "../../utils/dateUtils";

function TaskList() {
    const [tasks, setTasks] = useState<Task[]>([]);
    const [totalPage, settotalPage] = useState(0);
    const [loading, setLoading] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isEditMode, setIsEditMode] = useState(false);
    const [editingTaskId, setEditingTaskId] = useState<number | null>(null);
    const [isViewModalOpen, setIsViewModalOpen] = useState(false);
    const [viewingTask, setViewingTask] = useState<Task | null>(null);
    const [taskDescription, setTaskDescription] = useState("");
    const [newTaskTitle, setNewTaskTitle] = useState("");
    const [newTaskDescription, setNewTaskDescription] = useState("");
    const [newTaskDueDate, setNewTaskDueDate] = useState("");
    const [newTaskPriority, setNewTaskPriority] = useState<Priority>("Medium");
    const [newTaskStatus, setNewTaskStatus] = useState<TaskStatus>("In Progress");
    const [searchKeyword, setSearchKeyword] = useState("");
    const [statusFilter, setStatusFilter] = useState<TaskStatus | "All">("All");
    const [priorityFilter, setPriorityFilter] = useState<Priority | "All">("All");
    const [dateFrom, setDateFrom] = useState("");
    const [dateTo, setDateTo] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(10);

    useEffect(() => {
        loadTasks();
    }, [searchKeyword, statusFilter, priorityFilter, dateFrom, dateTo, currentPage]);

    const loadTasks = async () => {
        setLoading(true);
        try {
            const data = await taskService.getTasks({
                keyword: searchKeyword || undefined,
                status: statusFilter !== "All" ? statusFilter : undefined,
                priority: priorityFilter !== "All" ? priorityFilter : undefined,
                startDate: dateFrom || undefined,
                endDate: dateTo || undefined,
                page: currentPage,
                size: itemsPerPage
            });
            setTasks(data.items);
            settotalPage(data.total);
        } catch (err) {
            console.error("Lỗi khi tải tasks:", err);
        } finally {
            setLoading(false);
        }
    };
    const handleAddTask = async () => {
        if (!newTaskTitle.trim()) return;

        try {
            if (isEditMode && editingTaskId) {
                await taskService.updateTask(editingTaskId, {
                    title: newTaskTitle,
                    description: newTaskDescription,
                    dueDate: newTaskDueDate,
                    status: newTaskStatus,
                    priority: newTaskPriority,
                });
            } else {
                await taskService.createTask({
                    title: newTaskTitle,
                    description: newTaskDescription,
                    dueDate: newTaskDueDate,
                    status: newTaskStatus,
                    priority: newTaskPriority,
                });
            }
            
            resetModal();
            loadTasks();
        } catch (err) {
            console.error("Lỗi khi lưu task:", err);
        }
    };

    const resetModal = () => {
        setNewTaskTitle("");
        setNewTaskDescription("");
        setNewTaskDueDate("");
        setNewTaskPriority("Medium");
        setNewTaskStatus("In Progress");
        setIsModalOpen(false);
        setIsEditMode(false);
        setEditingTaskId(null);
    };

    const handleViewTask = async (task: Task) => {
        setViewingTask(task);
        setIsViewModalOpen(true);
        try {
            const taskDetail = await taskService.getTaskById(task.id);
            setTaskDescription(taskDetail.description || "Không có mô tả");
        } catch (err) {
            console.error("Lỗi khi tải chi tiết task:", err);
            setTaskDescription("Không thể tải mô tả");
        }
    };

    const handleEditTask = (task: Task) => {
        setNewTaskTitle(task.title);
        setNewTaskDescription("");
        setNewTaskDueDate(toDateInputValue(task.dueDate));
        setNewTaskPriority(task.priority);
        setNewTaskStatus(task.status);
        setEditingTaskId(task.id);
        setIsEditMode(true);
        setIsModalOpen(true);
    };

    const handleDeleteTask = async (taskId: number) => {
        if (!confirm("Đồng ý xóa task này?")) return;
        
        try {
            await taskService.deleteTask(taskId);
            loadTasks();
        } catch (err) {
            console.error("Lỗi khi xóa task:", err);
        }
    };

    const changeTaskStatus = async (taskId: number, newStatus: TaskStatus) => {
        try {
            const task = tasks.find(t => t.id === taskId);
            if (!task) return;
            
            await taskService.updateTask(taskId, {
                ...task,
                status: newStatus,
            });
            
            setTasks(
                tasks.map((task) =>
                    task.id === taskId
                        ? { ...task, status: newStatus }
                        : task
                )
            );
        } catch (err) {
            console.error("Lỗi khi cập nhật trạng thái:", err);
            loadTasks();
        }
    };

    const totalPages = totalPage;
    const currentTasks = tasks;

    const goToNextPage = () => {
        if (currentPage < totalPages) setCurrentPage((prev) => prev + 1);
    };

    const goToPreviousPage = () => {
        if (currentPage > 1) setCurrentPage((prev) => prev - 1);
    };

    const goToPage = (pageNumber: number) => {
        setCurrentPage(pageNumber);
    };

    const handleStatusFilterChange = (value: string) => {
        setStatusFilter(value as TaskStatus | "All");
        setCurrentPage(1);
    };

    const handleSearchChange = (value: string) => {
        setSearchKeyword(value);
        setCurrentPage(1);
    };

    return (
        <div className={styles.container}>
            <div className={styles.card}>
                <h1 className={styles.title}>QUẢN LÝ TASK</h1>

                <div className={styles.searchSection}>
                    <input
                        type="text"
                        placeholder="Tìm kiếm task..."
                        value={searchKeyword}
                        onChange={(e) => handleSearchChange(e.target.value)}
                        className={styles.searchInput}
                    />
                    <button onClick={() => {
                        resetModal();
                        setIsModalOpen(true);
                    }} className={styles.addButton}>
                        Thêm Task Mới
                    </button>
                </div>

                <div className={styles.filterSection}>
                    <div className={styles.filterHeader}>
                        <FaFilter className={styles.filterIcon} />
                        <span className={styles.filterTitle}>Bộ lọc</span>
                    </div>
                    
                    <div className={styles.filterGroup}>
                        <div className={styles.filterItem}>
                            <label className={styles.filterLabel}>Trạng thái</label>
                            <select
                                value={statusFilter}
                                onChange={(e) => handleStatusFilterChange(e.target.value)}
                                className={styles.filterDropdown}
                            >
                                <option value="All">Tất cả</option>
                                <option value="Pending">Chờ xử lý</option>
                                <option value="In Progress">Đang làm</option>
                                <option value="Completed">Hoàn thành</option>
                                <option value="Cancelled">Đã hủy</option>
                            </select>
                        </div>

                        <div className={styles.filterItem}>
                            <label className={styles.filterLabel}>Độ ưu tiên</label>
                            <select
                                value={priorityFilter}
                                onChange={(e) => {
                                    setPriorityFilter(e.target.value as Priority | "All");
                                    setCurrentPage(1);
                                }}
                                className={styles.filterDropdown}
                            >
                                <option value="All">Tất cả</option>
                                <option value="Low">Thấp</option>
                                <option value="Medium">Trung bình</option>
                                <option value="High">Cao</option>
                            </select>
                        </div>
                    </div>
                    
                    <div className={styles.dateFilterWrapper}>
                        <FaCalendarAlt className={styles.calendarIcon} />
                        <div className={styles.dateFilter}>
                            <input
                                type="date"
                                value={dateFrom}
                                onChange={(e) => setDateFrom(e.target.value)}
                                className={styles.dateInput}
                                placeholder="Từ ngày"
                            />
                            <span className={styles.dateSeparator}>→</span>
                            <input
                                type="date"
                                value={dateTo}
                                onChange={(e) => setDateTo(e.target.value)}
                                className={styles.dateInput}
                                placeholder="Đến ngày"
                            />
                        </div>
                    </div>
                </div>

                <div className={styles.tableContainer}>
                    <table className={styles.table}>
                        <thead>
                            <tr>
                                <th>Task</th>
                                <th>Due-date</th>
                                <th>Độ ưu tiên</th>
                                <th>Status</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {loading ? (
                                <tr>
                                    <td colSpan={5} style={{ textAlign: 'center', padding: '40px' }}>
                                        <div className={styles.loading}>Đang tải...</div>
                                    </td>
                                </tr>
                            ) : currentTasks.length === 0 ? (
                                <tr>
                                    <td colSpan={5} style={{ textAlign: 'center', padding: '40px', color: '#6b7280' }}>
                                        Không có task nào
                                    </td>
                                </tr>
                            ) : (
                                currentTasks.map((task) => (
                                <tr key={task.id}>
                                    <td className={styles.taskName} onClick={() => handleViewTask(task)} style={{cursor: 'pointer'}}>
                                        {task.title}
                                    </td>
                                    <td>{formatDate(task.dueDate) || "—"}</td>
                                    <td>
                                        <span className={
                                            task.priority === "High" ? styles.priorityHigh :
                                            task.priority === "Medium" ? styles.priorityMedium :
                                            styles.priorityLow
                                        }>
                                            {task.priority === "High" ? "Cao" :
                                             task.priority === "Medium" ? "Trung bình" : "Thấp"}
                                        </span>
                                    </td>
                                    <td>
                                        <select
                                            value={task.status}
                                            onChange={(e) => changeTaskStatus(task.id, e.target.value as TaskStatus)}
                                            className={
                                                task.status === "Completed"
                                                    ? styles.statusSelectCompleted
                                                    : task.status === "Pending"
                                                    ? styles.statusSelectPending
                                                    : task.status === "Cancelled"
                                                    ? styles.statusSelectCancelled
                                                    : styles.statusSelectInProgress
                                            }
                                        >
                                            <option value="Pending">Chờ</option>
                                            <option value="In Progress">Đang làm</option>
                                            <option value="Completed">Hoàn thành</option>
                                            <option value="Cancelled">Đã hủy</option>
                                        </select>
                                    </td>
                                    <td>
                                        <div className={styles.actions}>
                                            <button 
                                                onClick={() => handleEditTask(task)}
                                                className={styles.editButton}
                                            >
                                                <FaEdit />
                                            </button>
                                            <button
                                                onClick={() => handleDeleteTask(task.id)}
                                                className={styles.deleteButton}
                                            >
                                                <FaTrash />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            )))
                            }
                        </tbody>
                    </table>
                </div>

                {totalPages > 0 && (
                    <div className={styles.pagination}>
                        <button
                            onClick={goToPreviousPage}
                            disabled={currentPage === 1}
                            className={styles.paginationButton}
                        >
                            <FaChevronLeft />
                        </button>
                        
                        <div className={styles.pageNumbers}>
                            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                                <button
                                    key={page}
                                    onClick={() => goToPage(page)}
                                    className={`${styles.pageNumber} ${
                                        currentPage === page ? styles.activePageNumber : ""
                                    }`}
                                >
                                    {page}
                                </button>
                            ))}
                        </div>

                        <button
                            onClick={goToNextPage}
                            disabled={currentPage === totalPages}
                            className={styles.paginationButton}
                        >
                            <FaChevronRight />
                        </button>
                    </div>
                )}
            </div>

            {/* Modal */}
            {isModalOpen && (
                <div className={styles.modalOverlay} onClick={resetModal}>
                    <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
                        <div className={styles.modalHeader}>
                            <h2>{isEditMode ? "Edit Task" : "Thêm Task Mới"}</h2>
                            <button onClick={resetModal} className={styles.closeButton}>
                                <FaTimes />
                            </button>
                        </div>
                        <div className={styles.modalBody}>
                            <div className={styles.formGroup}>
                                <label>Tên Task *</label>
                                <input
                                    type="text"
                                    placeholder="Nhập tên task"
                                    value={newTaskTitle}
                                    onChange={(e) => setNewTaskTitle(e.target.value)}
                                    className={styles.modalInput}
                                />
                            </div>
                            <div className={styles.formGroup}>
                                <label>Mô tả</label>
                                <textarea
                                    placeholder="Nhập mô tả task"
                                    value={newTaskDescription}
                                    onChange={(e) => setNewTaskDescription(e.target.value)}
                                    className={styles.modalTextarea}
                                    rows={3}
                                />
                            </div>
                            <div className={styles.formGroup}>
                                <label>Ngày hết hạn</label>
                                <input
                                    type="date"
                                    value={newTaskDueDate}
                                    onChange={(e) => setNewTaskDueDate(e.target.value)}
                                    className={styles.modalInput}
                                />
                            </div>
                            <div className={styles.formGroup}>
                                <label>Trạng thái</label>
                                <select
                                    value={newTaskStatus}
                                    onChange={(e) => setNewTaskStatus(e.target.value as TaskStatus)}
                                    className={styles.modalSelect}
                                >
                                    <option value="Pending">Chờ xử lý</option>
                                    <option value="In Progress">Đang làm</option>
                                    <option value="Completed">Hoàn thành</option>
                                    <option value="Cancelled">Đã hủy</option>
                                </select>
                            </div>
                            <div className={styles.formGroup}>
                                <label>Độ ưu tiên</label>
                                <select
                                    value={newTaskPriority}
                                    onChange={(e) => setNewTaskPriority(e.target.value as Priority)}
                                    className={styles.modalSelect}
                                >
                                    <option value="Low">Thấp</option>
                                    <option value="Medium">Trung bình</option>
                                    <option value="High">Cao</option>
                                </select>
                            </div>
                        </div>
                        <div className={styles.modalFooter}>
                            <button onClick={resetModal} className={styles.cancelButton}>
                                Hủy
                            </button>
                            <button onClick={handleAddTask} className={styles.submitButton}>
                                {isEditMode ? "Cập nhật" : "Thêm Task"}
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* View Detail Modal */}
            {isViewModalOpen && viewingTask && (
                <div className={styles.modalOverlay} onClick={() => setIsViewModalOpen(false)}>
                    <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
                        <div className={styles.modalHeader}>
                            <h2>Chi tiết Task</h2>
                            <button onClick={() => setIsViewModalOpen(false)} className={styles.closeButton}>
                                <FaTimes />
                            </button>
                        </div>
                        <div className={styles.modalBody}>
                            <div className={styles.formGroup}>
                                <label>Tên Task</label>
                                <p className={styles.detailText}>{viewingTask.title}</p>
                            </div>
                            <div className={styles.formGroup}>
                                <label>Mô tả</label>
                                <p className={styles.detailText}>{taskDescription}</p>
                            </div>
                            <div className={styles.formGroup}>
                                <label>Ngày hết hạn</label>
                                <p className={styles.detailText}>{formatDate(viewingTask.dueDate) || "—"}</p>
                            </div>
                            <div className={styles.formGroup}>
                                <label>Trạng thái</label>
                                <p className={styles.detailText}>
                                    {viewingTask.status === "Pending" ? "Chờ xử lý" :
                                     viewingTask.status === "In Progress" ? "Đang làm" :
                                     viewingTask.status === "Completed" ? "Hoàn thành" : "Đã hủy"}
                                </p>
                            </div>
                            <div className={styles.formGroup}>
                                <label>Độ ưu tiên</label>
                                <p className={styles.detailText}>
                                    <span className={
                                        viewingTask.priority === "High" ? styles.priorityHigh :
                                        viewingTask.priority === "Medium" ? styles.priorityMedium :
                                        styles.priorityLow
                                    }>
                                        {viewingTask.priority === "High" ? "Cao" :
                                         viewingTask.priority === "Medium" ? "Trung bình" : "Thấp"}
                                    </span>
                                </p>
                            </div>
                        </div>
                        <div className={styles.modalFooter}>
                            <button onClick={() => setIsViewModalOpen(false)} className={styles.cancelButton}>
                                Đóng
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default TaskList;
