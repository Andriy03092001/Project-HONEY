using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using Project_HONEY.DataAccess.Entity;
using ProjectHONEY.DataAccess.Entity;
using System;
using System.Collections.Generic;
using System.Text;

namespace Project_STUDENTS.DataAccess.Entity
{
    public class EFContext : IdentityDbContext<User>
    {
        public EFContext(DbContextOptions<EFContext> options) : base(options) { }
        public DbSet<Course> Course { get; set; }
        public DbSet<UserSubscriptions> UserSubscriptions { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
        }
    }
}
