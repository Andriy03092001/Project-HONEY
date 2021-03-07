using Microsoft.AspNetCore.Identity;
using Project_HONEY.Domain.Interfaces;
using Project_HONEY.DTO.Models;
using Project_HONEY.Helper;
using Project_STUDENTS.DataAccess.Entity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Project_HONEY.Domain.Implementation
{
    public class QueriesService : IQueriesService
    {
        private EFContext _Context;
        private UserManager<User> _UserManeger;
        public QueriesService(EFContext Context, UserManager<User> UserManeger)
        {
            _UserManeger = UserManeger;
            _Context = Context;
        }

        public ListCoursesDTO getCourses(int page = 1, string searchText = "", int pageSize = 15)
        {
            var listCourses = _Context.Course.Select(t => new CourseDTO
            {
                Id = t.Id,
                Image = t.Image,
                Title = t.Title
            }).ToList();

            var count = listCourses.Count();
            var items = listCourses.Skip((page - 1) * pageSize).Take(pageSize).ToList();
            return new ListCoursesDTO()
            {
                Courses = items,
                totalCount = count,
                sizePage = pageSize
            };
        }

        public ListStudentDTO getStudents(int page = 1, string searchText = "", int pageSize = 15)
        {
            var listUsers = _UserManeger.GetUsersInRoleAsync(Constants.UserRole).Result.
                Select(t => new StudentDTO
                {
                    Id = t.Id,
                    Name = t.Name,
                    Age = t.Age,
                    Email = t.Email,
                    LastName = t.LastName,
                    RegisteredDate = t.RegisteredDate,
                    StudyDate = t.StudyDate
                })
                .ToList()
                .Where(
                    t => t.Email.ToLower().Contains(searchText.ToLower()) ||
                    t.Name.ToLower().Contains(searchText.ToLower()) ||
                    t.LastName.ToLower().Contains(searchText.ToLower()));

            var count = listUsers.Count();
            var items = listUsers.Skip((page - 1) * pageSize).Take(pageSize).ToList();
            return new ListStudentDTO()
            {
                Students = items,
                totalCount = count,
                sizePage = pageSize
            };
        }
    }
}
