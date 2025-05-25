using PhotoAlbum.Core.Dto;
using PhotoAlbum.Core.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PhotoAlbum.Core.IRepositories
{
    public interface IUserRepository
    {
        Task<User?> GetUserByNameAsync(string username);
        Task<IEnumerable<Role>> GetRolesByUserIdAsync(int userId);
        Task<IEnumerable<Permission>> GetPermissionsByRoleIdAsync(int roleId);
        Task<Role> GetRoleByNameAsync(string roleName);
        Task<bool> RegisterUserWithRoleAsync(User user, string roleName);
        Task<IEnumerable<User>> GetAllUsersAsync();
        Task<IEnumerable<UserWithPictureDto>> GetAllUsersWithPicturesAsync();
        User? GetUserById(int id);
    }
}
