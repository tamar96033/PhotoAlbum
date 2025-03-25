using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PhotoAlbum.Core.Entities
{
    public class UserRole
    {
        [Key]
        public int Id { get; set; }

        [Required]
        public int UserId { get; set; }

        [ForeignKey("UserId")]
        [Required]
        public required User User { get; set; }

        [Required]
        public int RoleId { get; set; }

        [ForeignKey("RoleId")]
        [Required]
        public required Role Role { get; set; }

        public UserRole(User user, Role role)
        {
            User = user;
            Role = role;
            UserId = user.Id;
            RoleId = role.Id;
        }
        public UserRole()
        {
            
        }
    }
}
