using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Project_STUDENTS.DataAccess.Entity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Project_STUDENTS_API___Angular.Helper
{
    public class SeederDatabase
    {
        public static void SeedData(IServiceProvider services,
          IWebHostEnvironment env,
          IConfiguration config)
        {
            using (var scope = services.GetRequiredService<IServiceScopeFactory>().CreateScope())
            {
                var manager = scope.ServiceProvider.GetRequiredService<UserManager<User>>();
                var managerRole = scope.ServiceProvider.GetRequiredService<RoleManager<IdentityRole>>();
                var context = scope.ServiceProvider.GetRequiredService<EFContext>();
                SeedUsers(manager, managerRole, context);
            }
        }
        private static void SeedUsers(UserManager<User> userManager, RoleManager<IdentityRole> roleManager, EFContext _context)
        {
            var roleName = "Admin";
            if (roleManager.FindByNameAsync(roleName).Result == null)
            {
                var resultAdminRole = roleManager.CreateAsync(new IdentityRole
                {
                    Name = "Admin"
                }).Result;
                var resultUserRole = roleManager.CreateAsync(new IdentityRole
                {
                    Name = "User"
                }).Result;
                
                string email = "admin@gmail.com";
                var admin = new User
                {
                    Email = email,
                    UserName = email,
                    Age = 0,
                    RegisteredDate = DateTime.Now.ToShortDateString(),
                    Name = "Admin",
                    LastName = "Admin"
                };

                var resultAdmin = userManager.CreateAsync(admin, "Qwerty1-").Result;
                resultAdmin = userManager.AddToRoleAsync(admin, "Admin").Result;
            }

            _context.Course.Add(new Project_HONEY.DataAccess.Entity.Course { 
            Title = "Angular",
            Image = "https://upload.wikimedia.org/wikipedia/commons/thumb/c/cf/Angular_full_color_logo.svg/1200px-Angular_full_color_logo.svg.png"
            });

            _context.Course.Add(new Project_HONEY.DataAccess.Entity.Course
            {
                Title = "Java Script",
                Image = "https://upload.wikimedia.org/wikipedia/commons/thumb/9/99/Unofficial_JavaScript_logo_2.svg/1200px-Unofficial_JavaScript_logo_2.svg.png"
            });


            _context.Course.Add(new Project_HONEY.DataAccess.Entity.Course
            {
                Title = "React",
                Image = "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/1200px-React-icon.svg.png"
            });


            _context.Course.Add(new Project_HONEY.DataAccess.Entity.Course
            {
                Title = "HTML\\CSS",
                Image = "https://knewit.kz/wp-content/uploads/2020/12/1lJ32Bl-lHWmNMUSiSq17gQ.png"
            });

            _context.SaveChanges();



            _context.SaveChanges();


        }
    }

}
