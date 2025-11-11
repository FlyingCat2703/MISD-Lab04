using TaskStatus = TaskApi.Enums.TaskStatus;
using TaskApi.Enums;

namespace TaskApi.Models.Entities
{
    public class Task
    {
        public int Id { get; set; }
        public string Title { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
        public DateTime ModifiedAt { get; set; } = DateTime.UtcNow;
        public DateTime DueDate { get; set; }
        public TaskStatus Status { get; set; } = TaskStatus.Pending;
        public Priority Priority { get; set; } = Priority.Medium;
    }
}