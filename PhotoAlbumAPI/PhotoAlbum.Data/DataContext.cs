using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using PhotoAlbum.Core.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PhotoAlbum.Data
{
    public class DataContext : DbContext
    {
        public DbSet<Album> Albums { get; set; }
        public DbSet<Picture> Pictures { get; set; }
        public DbSet<PictureTag> PictureTags { get; set; }
        public DbSet<Tag> Tags { get; set; }
        public DbSet<Permission> Permissions { get; set; }
        public DbSet<Role> Roles { get; set; }
        public DbSet<RolePermission> RolePermissions { get; set; }
        public DbSet<User> Users { get; set; }
        public DbSet<UserRole> UserRoles { get; set; }

        private readonly IConfiguration _configuration;

        public DataContext(IConfiguration configuration)
        {
            _configuration = configuration;
        }


        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
                var connectionString = _configuration.GetConnectionString("DefaultConnection");
                optionsBuilder.UseMySql(connectionString, ServerVersion.AutoDetect(connectionString));
            }
        }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<UserRole>()
                .HasKey(ur => new { ur.UserId, ur.RoleId });

            modelBuilder.Entity<UserRole>()
                .HasOne(ur => ur.User)
                .WithMany(u => u.UserRoles)
                .HasForeignKey(ur => ur.UserId);

            modelBuilder.Entity<UserRole>()
                .HasOne(ur => ur.Role)
                .WithMany(r => r.UserRoles)
                .HasForeignKey(ur => ur.RoleId);

            var roleAdmin = new Role
            {
                Id = 1,
                Name = "Admin",
                Description = "Administrator role",
                CreatedAt = DateTime.UtcNow,
                UpdatedAt = DateTime.UtcNow
            };

            modelBuilder.Entity<Role>().HasData(
                roleAdmin,
                new Role
                {
                    Id = 2,
                    Name = "User",
                    Description = "User role",
                    CreatedAt = DateTime.UtcNow,
                    UpdatedAt = DateTime.UtcNow
                });

            var admin = new User
            {
                Id = 1,
                Name = "admin",
                Email = "admin@admin.com",
                Password = "admin123", // ⚠️ Hash this in production
                CreatedAt = DateTime.UtcNow,
                UpdatedAt = DateTime.UtcNow
            };

            modelBuilder.Entity<User>().HasData(admin);

            modelBuilder.Entity<UserRole>().HasData(new UserRole
            {
                UserId = 1,
                RoleId = 1
            }
            );
        }
        //protected override void OnModelCreating(ModelBuilder modelBuilder)//putting the roles
        //{
        //    base.OnModelCreating(modelBuilder);

        //    var roleAdmin = new Role
        //    {
        //        Id = 1,
        //        Name = "Admin",
        //        Description = "Administrator role",
        //        CreatedAt = DateTime.UtcNow,
        //        UpdatedAt = DateTime.UtcNow
        //    };
        //    // Seed Roles data
        //    modelBuilder.Entity<Role>().HasData(
        //      roleAdmin,
        //        new Role
        //        {
        //            Id = 2,
        //            Name = "User",
        //            Description = "user role",
        //            CreatedAt = DateTime.UtcNow,
        //            UpdatedAt = DateTime.UtcNow
        //        }
        //    );
        //    var admin = new User
        //    {
        //        Id = 1,
        //        Name = "admin",
        //        Email = "admin@admin.com",
        //        Password = "admin123", // ⚠️ In production, hash the password!
        //        CreatedAt = DateTime.UtcNow,
        //        UpdatedAt = DateTime.UtcNow
        //    };
        //    // Seed Admin User
        //    modelBuilder.Entity<User>().HasData(admin);

        //    //modelBuilder.Entity<UserRole>()
        //    //    .HasKey(ur => new { ur.UserId, ur.RoleId });

        //    var userRole = new UserRole
        //    {
        //        UserId = admin.Id,
        //        RoleId = roleAdmin.Id
        //    };
        //    modelBuilder.Entity<UserRole>().HasData(
        //            //new UserRole(admin, roleAdmin)

        //        );
        //}
    }
}
