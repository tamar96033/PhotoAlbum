using PhotoAlbum.Core.Entities;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PhotoAlbum.Core.Dto
{
    public class UserDto
    {
        public int Id { get; set; }
        public string? Name { get; set; }

        public string? Email { get; set; }
        public string? Password { get; set; }

        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

        public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;


        //public List<UserRole> UserRoles { get; set; }
        //public List<Role> Roles { get; set; }

        public ICollection<AlbumDto> Albums { get; set; } = new List<AlbumDto>();

    }
}
