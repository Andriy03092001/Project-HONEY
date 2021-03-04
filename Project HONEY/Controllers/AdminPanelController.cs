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

        private EFContext _Context;
        public AdminPanelController(EFContext Context)
        {
            _Context = Context;
        }

        [Route("getStudents")]
        //[Authorize(Roles = "Admin")]
        public ListStudentDTO GetStudents(int page = 1, string q = "", int pageSize = 15)
        {
            var roleId = _Context.Roles.FirstOrDefault(t => t.Name == "User").Id;
            List<string> userIds = _Context.UserRoles.Where(a => a.RoleId == roleId).Select(b => b.UserId).Distinct().ToList();
            List<StudentDTO> listUsers = _Context.Users
                .Include(t => t.UserAdditionalInfo)
                .Where(a => userIds.Any(c => c == a.Id))
                .Where(
                    u => u.Email.Contains(q) ||
                    u.UserAdditionalInfo.LastName.Contains(q) ||
                    u.UserAdditionalInfo.Name.Contains(q))
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

            
            var count = listUsers.Count();
            var items = listUsers.Skip((page - 1) * pageSize).Take(pageSize).ToList();

            ListStudentDTO dto = new ListStudentDTO()
            {
                Students = items,
                totalCount = count,
                sizePage = pageSize
            };

            return dto;
        }





    }
}
