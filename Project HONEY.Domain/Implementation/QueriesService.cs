using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Project_HONEY.Domain.Interfaces;
using Project_HONEY.DTO.Models;
using Project_HONEY.Helper;
using Project_STUDENTS.DataAccess.Entity;
using ProjectHONEY.Domain.ModelArguments;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Project_HONEY.Domain.Implementation
{
    public class QueriesService : IQueriesService
    {
        private EFContext Context;
        private UserManager<User> UserManeger;
        public QueriesService(EFContext Context, UserManager<User> UserManeger)
        {
            this.UserManeger = UserManeger;
            this.Context = Context;
        }

        public ListCoursesDTO GetCourses(GetQuerieModel model)
        {
            var listCourses = Context.Course.AsNoTracking().Select(t => new CourseDTO
            {
                Id = t.Id,
                Image = t.Image,
                Title = t.Title
            }).Where(t => t.Title.ToLower().Contains(model.searchText.ToLower()));

            var count = listCourses.Count();
            var items = listCourses.Skip((model.page - 1) * model.pageSize).Take(model.pageSize).ToList();
            return new ListCoursesDTO
            {
                Courses = items,
                totalCount = count,
                sizePage = model.pageSize
            };
        }

        public ListStudentDTO GetStudents(GetQuerieModel model)
        {
            var listUsers = UserManeger.GetUsersInRoleAsync(Constants.UserRole).Result.
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
                    t => t.Email.ToLower().Contains(model.searchText.ToLower()) ||
                    t.Name.ToLower().Contains(model.searchText.ToLower()) ||
                    t.LastName.ToLower().Contains(model.searchText.ToLower()));

            var count = listUsers.Count();
            var items = listUsers.Skip((model.page - 1) * model.pageSize).Take(model.pageSize).ToList();
            return new ListStudentDTO()
            {
                Students = items,
                totalCount = count,
                sizePage = model.pageSize
            };
        }


    }
}
