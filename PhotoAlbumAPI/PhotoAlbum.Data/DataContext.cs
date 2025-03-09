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
        public DbSet<Core.Entities.File> Files { get; set; }
        public DbSet<FileTag> FileTags { get; set; }
        public DbSet<Tag> Tags { get; set; }
        
        private readonly IConfiguration _configuration;

        public DataContext(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseSqlServer(_configuration["AlbumDB"]);
        }
    }
}
    