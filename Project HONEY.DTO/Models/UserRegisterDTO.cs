using Project_STUDENTS.DTO.Helper;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace Project_student.DTO.Models
{
    public class UserRegisterDto
    {
        [Required(ErrorMessage = "Введіть ім'я")]
        public string Name { get; set; }
        
        
        [Required(ErrorMessage = "Введіть прізвище")]
        public string LastName { get; set; }
      
        [Required(ErrorMessage = "Введіть ваш вік")]
        public int Age { get; set; }


        [Required(ErrorMessage = "Введіть електронну пошту")]
        [EmailAddress(ErrorMessage = "Некоректно введена електронна пошта")]
        [CustomEmail(ErrorMessage = "Така електронна пошта вже зареєстрована")]
        public string Email { get; set; }

        
        
        [Required(ErrorMessage = "Введіть пароль")]
        [DataType(DataType.Password)]
        public string Password { get; set; }

    }
}
