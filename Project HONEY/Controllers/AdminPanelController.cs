using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
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
    public class AdminPanelController : ControllerBase
    {

        private EFContext _context;
        private UserManager<User> _userManager;
        public AdminPanelController(EFContext context, UserManager<User> userManager)
        {
            _context = context;
            _userManager = userManager;
        }

        [Route("getStudents")]
        //[Authorize(Roles = "Admin")]
        public List<StudentDTO> getStudents()
        {
            var roleId = _context.Roles.FirstOrDefault(t => t.Name == "User").Id;
            List<string> userIds = _context.UserRoles.Where(a => a.RoleId == roleId).Select(b => b.UserId).Distinct().ToList();
            List<StudentDTO> listUsers = _context.Users
                .Include(t => t.UserAdditionalInfo)
                .Where(a => userIds.Any(c => c == a.Id))
                .Select(t => new StudentDTO()
                {
                    Id = t.Id,
                    Name = t.UserAdditionalInfo.Name,
                    Age = t.UserAdditionalInfo.Age,
                    Email = t.Email,
                    LastName = t.UserAdditionalInfo.LastName,
                    RegisteredDate = t.UserAdditionalInfo.RegisteredDate,
                    StudyDate = t.UserAdditionalInfo.StudyDate
                }).ToList();

            return listUsers;
        }




    }
}
