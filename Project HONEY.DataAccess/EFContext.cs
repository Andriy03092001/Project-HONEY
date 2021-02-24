using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Text;

namespace Project_STUDENTS.DataAccess.Entity
{
    public class EFContext : IdentityDbContext<User>
    {
        public EFContext(DbContextOptions<EFContext> options) : base(options) { }
        public DbSet<UserAdditionalInfo> userAdditionalInfos { get; set; }
        
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<User>()
                .HasOne(u => u.UserAdditionalInfo)
                .WithOne(ui => ui.User)
                .HasForeignKey<UserAdditionalInfo>(ui => ui.Id);

            base.OnModelCreating(modelBuilder);
        }
    }
}
