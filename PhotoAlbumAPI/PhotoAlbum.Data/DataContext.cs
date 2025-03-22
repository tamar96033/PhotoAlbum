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

        protected override void OnModelCreating(ModelBuilder modelBuilder)//putting the roles
        {
            base.OnModelCreating(modelBuilder);

            // Seed Roles data
            modelBuilder.Entity<Role>().HasData(
                new Role
                {
                    Id = 1,
                    Name = "Admin",
                    Description = "Administrator role",
                    CreatedAt = DateTime.UtcNow,
                    UpdatedAt = DateTime.UtcNow
                },
                new Role
                {
                    Id = 2,
                    Name = "Editor",
                    Description = "Editor role",
                    CreatedAt = DateTime.UtcNow,
                    UpdatedAt = DateTime.UtcNow
                },
                new Role
                {
                    Id = 3,
                    Name = "Viewer",
                    Description = "Viewer role",
                    CreatedAt = DateTime.UtcNow,
                    UpdatedAt = DateTime.UtcNow
                }
            );
        }
    }
}
    