using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Project_HONEY.Domain.Implementation;
using Project_HONEY.DTO.Models;
using Project_STUDENTS.DataAccess.Entity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Project_HONEY.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CoursesController : ControllerBase
    {
        private EFContext _Context;
        private UserManager<User> _UserManeger;
        public QueriesService _QueriesService;
        public CommandService _CommandService;

        public CoursesController(EFContext Context, UserManager<User> UserManeger)
        {
            _UserManeger = UserManeger;
            _Context = Context;
            _QueriesService = new QueriesService(_Context, _UserManeger);
            _CommandService = new CommandService(_Context, _UserManeger);
        }

        [HttpGet("courses")]
        public ListCoursesDTO getCourses(int page = 1, string searchText = "", int pageSize = 8)
        {
            return _QueriesService.getCourses(page, searchText, pageSize);
        }
    }
}
