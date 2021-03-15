
using Project_HONEY.DataAccess.Entity;
using Project_STUDENTS.DataAccess.Entity;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace ProjectHONEY.DataAccess.Entity
{
    [Table("tblUserSubscriptions")]
    public class UserSubscriptions
    {
        [Key]
        public int Id { get; set; }
        [ForeignKey("User")]
        public string UserId { get; set; }
        [ForeignKey("Course")]
        public int CourseId { get; set; }
        [Required]
        public DateTime StartDate { get; set; }

        public virtual User User { get; set; }
        public virtual Course Course { get; set; }

    }
}
