using Hangfire;
using Microsoft.AspNetCore.Identity;
using Project_HONEY.Domain.Interfaces;
using Project_HONEY.DTO.Models;
using Project_HONEY.Helper;
using Project_STUDENTS.DataAccess.Entity;
using ProjectHONEY.DataAccess.Entity;
using ProjectHONEY.DTO.Models;
using ProjectHONEY.Helper;
using System;
using System.Linq;

namespace Project_HONEY.Domain.Implementation
{
    public class DateBaseCommandService : ICommandService
    {

        private EFContext Context;
        private UserManager<User> UserManeger;
        public DateBaseCommandService(EFContext Context, UserManager<User> UserManeger)
        {
            this.UserManeger = UserManeger;
            this.Context = Context;
        }

        //Courses:
        public void AddCourse(CreateCourseDTO dto)
        {
            Context.Course.Add(new DataAccess.Entity.Course
            {
                Image = dto.Image,
                Title = dto.Title
            });
            Context.SaveChanges();
        }

        public void DeleteCourse(int id)
        {
            var deleteItem = Context.Course.FirstOrDefault(t => t.Id == id);
            Context.Course.Remove(deleteItem);
            Context.SaveChanges();
        }

        //Students:
        public void EditStudent(EditStudentDTO dto)
        {
            var editStudent = Context.Users.FirstOrDefault(t => t.Id == dto.Id);
            editStudent.LastName = dto.LastName;
            editStudent.Name = dto.Name;
            editStudent.Age = dto.Age;
            editStudent.Email = dto.Email;
            Context.SaveChanges();
        }

        public void SubscriptionStudent(SubscriptionUserDTO dto)
        {
            Context.UserSubscriptions.Add(new UserSubscriptions
            {
                CourseId = dto.CourseId,
                StartDate = dto.StartDate,
                UserId = dto.UserId
            });

            var student = Context.Users.FirstOrDefault(t => t.Id == dto.UserId);
            if (student!=null) {
                var currentDate = DateTime.UtcNow;
                if (dto.StartDate > currentDate)
                {
                    EmailService emailServive = new EmailService();
                    Days daysConstants = new Days(dto.StartDate);

                    var job30days = BackgroundJob.Schedule(
                            () => emailServive.SendEmailAsync(student.Email,"Confirm password on HONEY COURSES", $"Good day.\n {student.Name} {student.LastName} you start training in course in month. See you at training."),
                            daysConstants.ThirtyDays);

                    var job7days = BackgroundJob.Schedule(
                            () => emailServive.SendEmailAsync(student.Email, "Confirm password on HONEY COURSES", $"Good day.\n {student.Name} {student.LastName} you start training in course in 1 week. See you at training."),
                            daysConstants.SevenDay);

                    var job1days = BackgroundJob.Schedule(
                        () => emailServive.SendEmailAsync(student.Email, "Confirm password on HONEY COURSES", $"Good day.\n {student.Name} {student.LastName} you start training in course in 1 day. See you at training."),
                        daysConstants.OneDays);
                }
            }

            Context.SaveChanges();
        }
    }
}
