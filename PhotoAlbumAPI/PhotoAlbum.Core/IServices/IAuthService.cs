using PhotoAlbum.Service.Dto;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PhotoAlbum.Core.IServices
{
    public interface IAuthService
    {
        //to Malka bruk
        //string GenerateJwtToken(string username, string[] roles);

        Task<string> GenerateJwtTokenAsync(string username,  string password);
        Task<bool> RegisterUserWithRoleAsync(RegisterUserDto dto);
    }
}
