using Microsoft.EntityFrameworkCore;
using TaskApi.Repositories.Interfaces;
using TaskApi.Services.Interfaces;
using TaskModel = TaskApi.Models.Entities.Task;
using TaskDTO = TaskApi.Models.DTOs.TaskDTO;
using TaskApi.Models.DTOs;
using AutoMapper;
using TaskStatus = TaskApi.Enums.TaskStatus;
using TaskApi.Enums;

namespace TaskApi.Services.Implementations
{
    public class TaskService : ITaskService
    {
        private readonly ITaskRepository _taskRepository;
        private readonly IMapper _mapper;

        public TaskService(ITaskRepository taskRepository, IMapper mapper)
        {
            _taskRepository = taskRepository;
            _mapper = mapper;
        }

        public async Task<IEnumerable<TaskDTO>?> GetAllTask(int page, int size)
        {
            if (page < 1) page = 1;
            if (size < 10) size = 10;
            var query = _taskRepository.GetAll();

            var pagedSongs = await query
                .Skip((page - 1) * size)
                .Take(size)
                .ToListAsync();

            return _mapper.Map<IEnumerable<TaskDTO>>(pagedSongs);
        }

        public async Task<TaskDTO?> GetByIdAsync(int id)
        {
            var task = await _taskRepository.GetByIdAsync(id);
            return task == null ? null : _mapper.Map<TaskDTO>(task);
        }

        public async Task CreateTaskAsync(CreateTaskDTO task)
        {
            if (task == null) throw new ArgumentNullException("Task không được null");

            await _taskRepository.AddAsync(_mapper.Map<TaskModel>(task));
            await _taskRepository.SaveChangesAsync();
        }

        public async Task UpdateTask(UpdateTaskDTO task)
        {
            var existing = await _taskRepository.GetByIdAsync(task.Id);
            if (existing == null) throw new KeyNotFoundException("Task không tồn tại!!");

            existing.Title = task.Title ?? existing.Title;
            existing.Description = task.Description ?? existing.Description;
            existing.DueDate = task.DueDate ?? existing.DueDate;
            existing.Status = task.Status ?? existing.Status;
            existing.Priority = task.Priority ?? existing.Priority;

            _taskRepository.Update(existing);
            await _taskRepository.SaveChangesAsync();
        }

        public async Task DeleteTask(int id)
        {
            var existing = await _taskRepository.GetByIdAsync(id);
            if (existing == null) throw new KeyNotFoundException();

            _taskRepository.Remove(_mapper.Map<TaskModel>(existing));
            await _taskRepository.SaveChangesAsync();
        }

        public async Task<TaskApi.Models.Entities.PagedResult<TaskDTO>?> Search(string keyword, int page = 1, int size = 10)
        {
            if (page < 1) page = 1;
            if (size < 10) size = 10;

            var tasks = await _taskRepository.Search(keyword);
            if (tasks == null) return null;
            var pagedTasks = tasks
                .Skip((page - 1) * size)
                .Take(size)
                .ToList();

            return new TaskApi.Models.Entities.PagedResult<TaskDTO>
            {
                Items = _mapper.Map<IEnumerable<TaskDTO>>(pagedTasks),
                Total = (int)Math.Ceiling((double)tasks.Count() / size),
                Page = page,
                Size = size
            };
        }
        
        public async Task<TaskApi.Models.Entities.PagedResult<TaskDTO>?> Filter(string? keyword, TaskStatus? status, Priority? priority, DateTime? startDate, DateTime? endDate, int page = 1, int size = 10)
        {
            var query = _taskRepository.GetAll();
            
            if (!string.IsNullOrWhiteSpace(keyword))
                query = query.Where(t => t.Title.Contains(keyword) 
                                    || t.Description.Contains(keyword));

            if (status.HasValue)
                query = query.Where(t => t.Status == status.Value);

            if (priority.HasValue)
                query = query.Where(t => t.Priority == priority.Value);

            if (startDate.HasValue)
                query = query.Where(t => t.CreatedAt >= startDate.Value);

            if (endDate.HasValue)
                query = query.Where(t => t.CreatedAt <= endDate.Value);

            var total = await query.CountAsync();

            var pagedTasks = await query
                .OrderByDescending(t => t.CreatedAt)
                .Skip((page - 1) * size)
                .Take(size)
                .ToListAsync();

            return new TaskApi.Models.Entities.PagedResult<TaskDTO>
            {
                Items = _mapper.Map<IEnumerable<TaskDTO>>(pagedTasks),
                Total = (int)Math.Ceiling((double)total / size),
                Page = page,
                Size = size
            };
        }
    }
}