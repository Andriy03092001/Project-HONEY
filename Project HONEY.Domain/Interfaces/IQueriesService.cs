using Project_HONEY.DTO;
using Project_HONEY.DTO.Models;
using ProjectHONEY.Domain.ModelArguments;
using System;
using System.Collections.Generic;
using System.Text;

namespace Project_HONEY.Domain.Interfaces
{
    public interface IQueriesService
    {
        public ListStudentDTO GetStudents(GetQuerieModel model);
        public ListCoursesDTO GetCourses(GetQuerieModel model);
        public ProfileDTO GetProfile(string id);

    }
}
