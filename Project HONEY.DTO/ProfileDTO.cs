using Project_HONEY.DTO.Models;
using System;
using System.Collections.Generic;
using System.Text;

namespace Project_HONEY.DTO
{
    public class ProfileDTO
    {
        public string FullName { get; set; }
        public string Email { get; set; }
        public int Age { get; set; }
        public List<CourseDTO> Courses { get; set; }

    }
}
