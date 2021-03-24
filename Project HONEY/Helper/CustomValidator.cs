using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc.ModelBinding;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Project_STUDENTS_API___Angular.Helper
{
    public class CustomValidator
    {
        public string GetErrorsByModel(
            ModelStateDictionary modelErrors)
        {
            string errors = "";

            var errorList = modelErrors
                .Where(x => x.Value.Errors.Count > 0)
                .ToDictionary(
                    kvp => kvp.Key,
                    kvp => kvp.Value.Errors.Select(e => e.ErrorMessage).ToArray()[0]
                );
            foreach (var item in errorList)
            {
                string key = item.Key;
                //key=key.Replace(key[0], char.ToLower(key[0]));
                key = char.ToLower(key[0]).ToString() + key.Substring(1);
                errors += item.Value + " ";
            }
            return errors;
        }

        public static string GetErrorsByIdentityResult(
                                                    IdentityResult result)
        {
            var errors = result.Errors.First().Description.ToString();
            //foreach (var item in errors)
            //{
            //    listErrors += item.Description + " ";
            //}

            return errors;
        }

    }
}
