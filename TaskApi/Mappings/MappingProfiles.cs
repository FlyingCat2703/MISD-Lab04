using AutoMapper;
using TaskModel = TaskApi.Models.Entities.Task;
using TaskDTO = TaskApi.Models.DTOs.TaskDTO;
using CreateTaskDTO = TaskApi.Models.DTOs.CreateTaskDTO;
using TaskApi.Models.DTOs;

namespace TaskApi.Mapping
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            CreateMap<TaskModel, TaskDTO>().ReverseMap();
            CreateMap<TaskModel, CreateTaskDTO>().ReverseMap();
            CreateMap<TaskModel, UpdateTaskDTO>().ReverseMap();
        }
    }
}