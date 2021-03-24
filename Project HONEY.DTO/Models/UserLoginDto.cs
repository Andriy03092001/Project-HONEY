using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace Project_student.DTO.Models
{
    public class UserLoginDto
    {
        [Required(ErrorMessage = "Введіть електронну пошту")]
        public string Email { get; set; }

     
        [Required(ErrorMessage = "Введіть пароль")]
        public string Password { get; set; }
    }
}
