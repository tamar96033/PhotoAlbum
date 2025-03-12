using Microsoft.EntityFrameworkCore;
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
        public async Task<User> GetUserByNameAsync(string username)
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
            return await _context.Roles.FirstOrDefaultAsync(r => r.Name == roleName);
        }


        public async Task<bool> RegisterUserWithRoleAsync(User user, string roleName)
        {
            // Check if user already exists
            if (await GetUserByNameAsync(user.Name) != null)
                return false;

            // Get the role
            var role = await GetRoleByNameAsync(roleName);
            if (role == null)
                return false;

            // Add the user
            _context.Users.Add(user);
            await _context.SaveChangesAsync();

            // Create the user-role association
            var userRole = new UserRole
            {
                UserId = user.Id,
                RoleId = role.Id
            };

            _context.UserRoles.Add(userRole);
            await _context.SaveChangesAsync();

            return true;
        }
    }
}
