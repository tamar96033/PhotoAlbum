using System.ComponentModel.DataAnnotations;

namespace PhotoAlbum.API.Dto
{
    public class RegisterAdminDto
    {
        public string? Name { get; set; }
        [EmailAddress]
        public string? Email { get; set; }
        public string? Password { get; set; }
        public string? RoleName { get; set; }

        public string RegisterManagerToken { get; set; }
    }
}
