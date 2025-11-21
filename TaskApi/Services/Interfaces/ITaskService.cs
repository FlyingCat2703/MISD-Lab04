// using TaskModel = TaskApi.Models.Entities.Task;
// using TaskStatus = TaskApi.Enums.TaskStatus;
using TaskDTO = TaskApi.Models.DTOs.TaskDTO;
using TaskApi.Models.DTOs;
using TaskStatus = TaskApi.Enums.TaskStatus;
using TaskApi.Enums;

namespace TaskApi.Services.Interfaces
{
    public interface ITaskService
    {
        Task<IEnumerable<TaskDTO>?> GetAllTask(int page, int size);
        Task<TaskDTO?> GetByIdAsync(int id);
        Task CreateTaskAsync(CreateTaskDTO task);
        Task UpdateTask(UpdateTaskDTO task);
        Task DeleteTask(int id);
        Task<TaskApi.Models.Entities.PagedResult<TaskDTO>?> Search(string keyword, int page, int name);
        Task<TaskApi.Models.Entities.PagedResult<TaskDTO>?> Filter(string? keyword, TaskStatus? status, Priority? priority, DateTime? startDate, DateTime? endDate, int page, int size);
    }
}