using Microsoft.AspNetCore.Identity;
using Project_STUDENTS.DataAccess.Entity;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace Project_STUDENTS.DTO.Helper
{
    public class CustomEmailAttribute : ValidationAttribute
    {
        protected override ValidationResult IsValid(object value,
            ValidationContext validationContext)
        {
            if (value != null)
            {
                var service = (UserManager<User>)validationContext
                         .GetService(typeof(UserManager<User>));


                var user = service.FindByEmailAsync(value.ToString())
                    .Result;

                if (user != null)
                {
                    return new ValidationResult(null);
                }
                return ValidationResult.Success;
            }
            return new ValidationResult(null);
        }
    }


    public class IsDigitalsAttribute : ValidationAttribute
    {
        protected override ValidationResult IsValid(object value,
            ValidationContext validationContext)
        {
            if (value != null)
            {

                return ValidationResult.Success;
            }
            return new ValidationResult(null);
        }
    }

}
