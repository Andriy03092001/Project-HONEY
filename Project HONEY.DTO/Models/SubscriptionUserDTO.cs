using System;
using System.Collections.Generic;
using System.Text;

namespace ProjectHONEY.DTO.Models
{
    public class SubscriptionUserDTO
    {
        public string UserId { get; set; }
        public int CourseId { get; set; }
        public DateTime StartDate { get; set; }
    }
}
