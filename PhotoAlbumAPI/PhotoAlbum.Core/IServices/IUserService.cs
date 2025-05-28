using PhotoAlbum.Core.Dto;
using PhotoAlbum.Core.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PhotoAlbum.Core.IServices
{
    public interface IUserService
    {
        Task<IEnumerable<User>> GetAllUsersAsync();
        Task<IEnumerable<UserWithPictureDto>> GetAllUsersWithPicturesAsync();
        User? GetUserFromToken(string token);
    }
}
