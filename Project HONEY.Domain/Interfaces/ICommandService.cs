using Microsoft.AspNetCore.Mvc;
using Project_HONEY.DTO.Models;
using ProjectHONEY.DTO.Models;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Project_HONEY.Domain.Interfaces
{
    public interface ICommandService
    {
        public void EditStudent(EditStudentDTO dto);
        public void AddCourse(CreateCourseDTO dto);
        public void DeleteCourse(int id);
        public void SubscriptionStudent(SubscriptionUserDTO dto);
    }
}
