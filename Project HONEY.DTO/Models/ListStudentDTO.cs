using System;
using System.Collections.Generic;
using System.Text;

namespace Project_HONEY.DTO.Models
{
    public class ListStudentDTO
    {
        public List<StudentDTO> Students { get; set; }
        public int sizePage { get; set; }
        public int totalCount { get; set; }
    }
}
