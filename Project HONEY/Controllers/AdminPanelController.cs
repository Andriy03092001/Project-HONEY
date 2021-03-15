using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Project_HONEY.Domain.Implementation;
using Project_HONEY.DTO.Models;
using Project_HONEY.Helper;
using Project_STUDENTS.DataAccess.Entity;
using ProjectHONEY.Domain.ModelArguments;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Project_HONEY.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AdminPanelController : ControllerBase
    {
        private EFContext Context;
        private UserManager<User> UserManeger;
        private QueriesService QueriesService;
        private DateBaseCommandService CommandService;

        public AdminPanelController(EFContext Context, UserManager<User> UserManeger)
        {
            this.UserManeger = UserManeger;
            this.Context = Context;
            QueriesService = new QueriesService(this.Context, this.UserManeger);
            CommandService = new DateBaseCommandService(this.Context, this.UserManeger);
        }

        [HttpGet("students")]
        //[Authorize(Roles = "Admin")]
        public ListStudentDTO GetStudents([FromQuery] GetQuerieModel model)//Model
        {
            return QueriesService.GetStudents(model);
        }

        [HttpPut("editStudent")]
        //[Authorize(Roles = "Admin")]
        public IActionResult EditStudent(EditStudentDTO dto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest("Please, enter all field correct");
            }
            else
            {
                CommandService.EditStudent(dto);
                return Ok("The student has successfully edited");
            }
        }

        [HttpPost("addCourse")]
        //[Authorize(Roles = "Admin")]
        public IActionResult AddCourse(CreateCourseDTO dto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest("Please, enter all field correct");
            }
            else
            {
                CommandService.AddCourse(dto);
                return Ok("The course has successfully added");
            }
        }

    }
}
