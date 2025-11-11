using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.ActionConstraints;
using TaskApi.Services.Interfaces;
using TaskStatus = TaskApi.Enums.TaskStatus;
using TaskApi.Enums;

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
        public async Task<IActionResult> Search(string? keyword, int page, int size)
        {
            if (keyword != null) return Ok(await _taskService.Search(keyword, page, size));
            else return Ok(await _taskService.GetAllTask(page, size));
        }

        [HttpGet("filter")]
        public async Task<IActionResult> Filter(string? keyword, TaskStatus? status, Priority? priority, int page = 1, int size = 10)
        {
            var results = await _taskService.Filter(keyword, status, priority, page, size);
            return Ok(results);
        }
    }
}