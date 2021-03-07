using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Project_HONEY.Domain.Implementation;
using Project_HONEY.DTO.Models;
using Project_HONEY.Helper;
using Project_STUDENTS.DataAccess.Entity;
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

        private EFContext _Context;
        private UserManager<User> _UserManeger;
        public QueriesService _QueriesService;
        public CommandService _CommandService;

        public AdminPanelController(EFContext Context, UserManager<User> UserManeger)
        {
            _UserManeger = UserManeger;
            _Context = Context;
            _QueriesService = new QueriesService(_Context, _UserManeger);
            _CommandService = new CommandService(_Context, _UserManeger); 
        }

        [HttpGet("students")]
        //[Authorize(Roles = "Admin")]
        public ListStudentDTO GetStudents(int page = 1, string searchText = "", int pageSize = 15)
        {
            return _QueriesService.getStudents(page, searchText, pageSize);
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
                _CommandService.EditStudent(dto);
                return Ok("The student has successfully edited");
            }
        }
    }
}
