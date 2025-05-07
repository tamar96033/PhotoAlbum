using Microsoft.EntityFrameworkCore;
using PhotoAlbum.Core.Dto;
using PhotoAlbum.Core.Entities;
using PhotoAlbum.Core.IRepositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PhotoAlbum.Data.Repositories
{
    public class UserRepository : IUserRepository
    {
        private readonly DataContext _context;

        public UserRepository(DataContext context)
        {
            _context = context;
        }

        // Get a user by name 
        public async Task<User?> GetUserByNameAsync(string username)
        {
            return await _context.Users
                .FirstOrDefaultAsync(u => u.Name == username);
        }

        // Get roles for a given user
        public async Task<IEnumerable<Role>> GetRolesByUserIdAsync(int userId)
        {
            return await _context.UserRoles
                .Where(ur => ur.UserId == userId)
                .Select(ur => ur.Role)
                .ToListAsync();
        }

        // Get permissions for a given role
        public async Task<IEnumerable<Permission>> GetPermissionsByRoleIdAsync(int roleId)
        {
            return await _context.RolePermissions
                .Where(rp => rp.RoleId == roleId)
                .Select(rp => rp.Permission)
                .ToListAsync();
        }

        public async Task<Role> GetRoleByNameAsync(string roleName)
        {
            return await _context.Roles.FirstOrDefaultAsync(r => r.Name == roleName) ?? new Role();
        }


        //public async Task<bool> RegisterUserWithRoleAsync(User user, string roleName)
        //{
        //    // Check if user already exists
        //    if (await GetUserByNameAsync(user.Name ?? "") != null)
        //        return false;

        //    // Get the role
        //    var role = await GetRoleByNameAsync(roleName);
        //    if (role == null)
        //        return false;

        //    // Add the user
        //    _context.Users.Add(user);
        //    await _context.SaveChangesAsync();

        //    // Create the user-role association
        //    var userRole = new UserRole(user, role)
        //    {
        //        User = user,
        //        Role = role
        //    };

        //    _context.UserRoles.Add(userRole);
        //    await _context.SaveChangesAsync();

        //    return true;
        //}
        public async Task<bool> RegisterUserWithRoleAsync(User user, string roleName)
        {
            // Check if user already exists
            if (await GetUserByNameAsync(user.Name ?? "") != null)
                return false;

            // Find the role
            var role = await GetRoleByNameAsync(roleName);
            if (role == null)
                return false;

            // Add user
            _context.Users.Add(user);
            //await _context.SaveChangesAsync();

            // Link user to role
            var userRole = new UserRole
            {
                User = user,
                Role = role
            };

            _context.UserRoles.Add(userRole);
            //await _context.SaveChangesAsync();

            return true;
        }

        public async Task<IEnumerable<User>> GetAllUsersAsync()
        {
            return _context.Users.ToList();
        }

        public async Task<IEnumerable<UserWithPictureDto>> GetAllUsersWithPicturesAsync()
        {
            var users = await _context.Users
               .Select(u => new UserWithPictureDto
               {
                   Id = u.Id,
                   Name = u.Name,
                   Pictures = _context.Pictures
                       .Where(p => p.UserId == u.Id)
                       .Select(p => new PictureDto
                       {
                           Id = p.Id,
                           Url = p.Url,
                           Name = p.Name
                       }).ToList()
               })
               .ToListAsync();

            return users;
        }
    }
}
