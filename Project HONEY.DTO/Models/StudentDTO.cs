using System;
using System.Collections.Generic;
using System.Text;

namespace Project_HONEY.DTO.Models
{
    public class StudentDTO
    {
        public string Key { get; set; }
        public string Name { get; set; }
        public string LastName { get; set; }
        public int Age { get; set; }
        public string Email { get; set; }
        public string RegisteredDate { get; set; }
        public string StudyDate { get; set; }
        public List<CourseDTO> Courses { get; set; }
    }
}
