using Microsoft.AspNetCore.Mvc;
using TaskApi.Services.Interfaces;
using TaskStatus = TaskApi.Enums.TaskStatus;
using TaskApi.Enums;
using TaskApi.Models.DTOs;

namespace TaskApi.Controllers
{
    [Route("api/tasks")]
    [ApiController]
    public class TaskController : ControllerBase
    {
        private readonly ITaskService _taskService;

        public TaskController(ITaskService taskService)
        {
            _taskService = taskService;
        }

        // GET /api/tasks?page=1&size=20
        [HttpGet]
        public async Task<IActionResult> GetAll(int page = 1, int size = 20)
        {
            var result = await _taskService.GetAllTask(page, size);
            return Ok(result);
        }

        // GET /api/tasks/search?keyword=abc
        [HttpGet("search")]
        public async Task<IActionResult> Search(string? keyword, int page = 1, int size = 10)
        {
            if (keyword != null) return Ok(await _taskService.Search(keyword, page, size));
            else return Ok(await _taskService.GetAllTask(page, size));
        }

        [HttpGet("filter")]
        public async Task<IActionResult> Filter(string? keyword, TaskStatus? status, Priority? priority, DateTime? startDate, DateTime? endDate, int page = 1, int size = 10)
        {
            var results = await _taskService.Filter(keyword, status, priority, startDate, endDate, page, size);
            return Ok(results);
        }

        [HttpPut("update")]
        public async Task<IActionResult> Update(UpdateTaskDTO task)
        {
            try
            {
                await _taskService.UpdateTask(task);
                return Ok(new { isSuccess = true, message = "Update task thành công" });
            }
            catch (KeyNotFoundException exception)
            {
                return NotFound(new { isSuccess = false, message = exception.Message });
            }
        }

        [HttpPost("create")]
        public async Task<IActionResult> Create(CreateTaskDTO task)
        {
            try
            {
                await _taskService.CreateTaskAsync(task);
                return Ok(new { isSuccess = true, message = "Tạo task thành công" });
            }
            catch (ArgumentNullException exception)
            {
                return NotFound(new { isSuccess = false, message = exception.Message });
            }
        }

        [HttpDelete("delete")]
        public async Task<IActionResult> Delete(int id)
        {
            try
            {
                await _taskService.DeleteTask(id);
                return Ok(new { isSuccess = true, message = "Xóa task thành công" });
            }
            catch (KeyNotFoundException exception)
            {
                return NotFound(new { isSuccess = false, message = exception.Message });
            }
        }

        [HttpGet("{id:int}")]
        public async Task<IActionResult> GetDetail(int id)
        {
            var result = await _taskService.GetByIdAsync(id);
            return Ok(result);
        }
    }
}