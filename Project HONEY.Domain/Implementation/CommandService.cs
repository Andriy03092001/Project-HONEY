using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Project_HONEY.Domain.Interfaces;
using Project_HONEY.DTO.Models;
using Project_STUDENTS.DataAccess.Entity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Project_HONEY.Domain.Implementation
{
    public class CommandService : ICommandService
    {

        private EFContext _Context;
        private UserManager<User> _UserManeger;
        public CommandService(EFContext Context, UserManager<User> UserManeger)
        {
            _UserManeger = UserManeger;
            _Context = Context;
        }

        //Courses:
        public void AddCourse(CreateCourseDTO dto)
        {
            _Context.Course.Add(new DataAccess.Entity.Course
            {
                Image = dto.Image,
                Title = dto.Title
            });
            _Context.SaveChanges();
        }

        public void DeleteCourse(int id)
        {
            var deleteItem = _Context.Course.FirstOrDefault(t => t.Id == id);
            _Context.Course.Remove(deleteItem);
            _Context.SaveChanges();
        }



        //Students:
        public void EditStudent(EditStudentDTO dto)
        {
            var editStudent = _Context.Users.FirstOrDefault(t => t.Id == dto.Id);
            editStudent.LastName = dto.LastName;
            editStudent.Name = dto.Name;
            editStudent.Age = dto.Age;
            editStudent.Email = dto.Email;
            _Context.SaveChanges();
        }
    }
}
