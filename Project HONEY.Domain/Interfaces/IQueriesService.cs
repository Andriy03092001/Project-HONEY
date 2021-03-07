using Project_HONEY.DTO.Models;
using System;
using System.Collections.Generic;
using System.Text;

namespace Project_HONEY.Domain.Interfaces
{
    public interface IQueriesService
    {
        public ListStudentDTO getStudents(int page = 1, string searchText = "", int pageSize = 15);
        public ListCoursesDTO getCourses(int page = 1, string searchText = "", int pageSize = 15);
    }
}
