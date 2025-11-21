using TaskStatus = TaskApi.Enums.TaskStatus;
using PriorityEnum = TaskApi.Enums.Priority;
using TaskApi.Enums;
using System.ComponentModel.DataAnnotations;

namespace TaskApi.Models.DTOs
{
    public class UpdateTaskDTO
    {
        [Required]
        public int Id { get; set; }
        public string? Title { get; set; } = string.Empty;
        public string? Description { get; set; } = string.Empty;
        public DateTime? DueDate { get; set; }
        public TaskStatus? Status { get; set; } = TaskStatus.Pending;
        public Priority? Priority { get; set; } = PriorityEnum.Medium;
    }
}