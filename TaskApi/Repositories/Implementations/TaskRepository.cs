using Microsoft.EntityFrameworkCore;
using TaskApi.Data;
using TaskApi.Repositories.Interfaces;
using TaskModel = TaskApi.Models.Entities.Task;

namespace TaskApi.Repositories.Implementations
{
    public class TaskRepository : ITaskRepository
    {
        private readonly DBContext _dbContext;

        public TaskRepository(DBContext dbContext)
        {
            _dbContext = dbContext;
        }

        public IQueryable<TaskModel> GetAll()
        {
            return _dbContext.Task.AsNoTracking();
        }

        public async Task<TaskModel?> GetByIdAsync(int id)
        {
            var task = await _dbContext.Task.FirstOrDefaultAsync(t => t.Id == id);
            return task == null ? null : task;
        }

        public async Task AddAsync(TaskModel task)
        {
            await _dbContext.Task.AddAsync(task);
        }

        public void Update(TaskModel task)
        {
            _dbContext.Update(task);
        }

        public void Remove(TaskModel task)
        {
            _dbContext.Remove(task);
        }

        public async Task<IEnumerable<TaskModel>?> Search(string keyword)
        {
            return await _dbContext.Task
                .Where(r => EF.Functions.Like(r.Title, $"%{keyword}%"))
                .ToListAsync();
        }
        
        public async Task<int> SaveChangesAsync()
        {
            return await _dbContext.SaveChangesAsync();
        }
    }
}