using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Project_HONEY.Domain.Implementation;
using Project_HONEY.DTO.Models;
using Project_STUDENTS.DataAccess.Entity;
using ProjectHONEY.Domain.ModelArguments;
using ProjectHONEY.DTO.Models;
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
        private EFContext Context;
        private UserManager<User> UserManeger;
        private QueriesService QueriesService;
        public DateBaseCommandService CommandService;

        public CoursesController(EFContext Context, UserManager<User> UserManeger)
        {
            this.UserManeger = UserManeger;
            this.Context = Context;
            this.QueriesService = new QueriesService(this.Context, this.UserManeger);
            this.CommandService = new DateBaseCommandService(this.Context, this.UserManeger);
        }

        [HttpGet("courses")]
        public ListCoursesDTO GetCourses([FromQuery] GetQuerieModel model)
        {
            return QueriesService.GetCourses(model);
        }

        [HttpPost("subscription")]
        public IActionResult SubOnCourse([FromBody] SubscriptionUserDTO model)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest("Please, enter all field correct");
            }
            else
            {
                CommandService.SubscriptionStudent(model);
                return Ok("The student has successfully signed on course");
            }
        }
    }
}
