using TaskModel = TaskApi.Models.Entities.Task;

namespace TaskApi.Repositories.Interfaces
{
    public interface ITaskRepository
    {
        IQueryable<TaskModel> GetAll();
        Task<TaskModel?> GetByIdAsync(int id);
        Task AddAsync(TaskModel task);
        void Update(TaskModel task);
        void Remove(TaskModel task);
        Task<IEnumerable<TaskModel>?> Search(string keyword);
        Task<int> SaveChangesAsync();
    }
}