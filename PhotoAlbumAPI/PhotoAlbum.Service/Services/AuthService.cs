using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using PhotoAlbum.Core.Entities;
using PhotoAlbum.Core.IRepositories;
using PhotoAlbum.Core.IServices;
using PhotoAlbum.Service.Dto;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

namespace PhotoAlbum.Service.Services
{
    public class AuthService : IAuthService
    {
        private readonly IConfiguration _configuration;
        private readonly IUserRepository _userRepository;
        private readonly IRepositoryManager _repositoryManager;

        public AuthService(IConfiguration configuration, IUserRepository userRepository, IRepositoryManager repositoryManager)
        {
            _configuration = configuration;
            _userRepository = userRepository;
            _repositoryManager = repositoryManager;
        }
       
        public async Task<string> GenerateJwtTokenAsync(string username, string password)
        {
            var user = await _userRepository.GetUserByNameAsync(username);
            if (user == null || user.Password != password)
            {
                return ""; // Invalid user or password
            }

            var roles = await _userRepository.GetRolesByUserIdAsync(user.Id);
            if (roles == null || !roles.Any())
            {
                return ""; // No roles found
            }

            var roleNames = roles.Select(r => r.Name).ToArray();

            var claims = new List<Claim>
    {
        new Claim(ClaimTypes.Name, user.Name ?? "Unknown"),
        new Claim(ClaimTypes.NameIdentifier, user.Id.ToString()) // ✅ Add the user ID here
    };

            foreach (var role in roleNames)
            {
                claims.Add(new Claim(ClaimTypes.Role, role ?? "Unknown"));
            }

            var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["Jwt:Key"]));
            var credentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);
            var token = new JwtSecurityToken(
                issuer: _configuration["Jwt:Issuer"],
                audience: _configuration["Jwt:Audience"],
                claims: claims,
                expires: DateTime.Now.AddMinutes(30),
                signingCredentials: credentials
            );

            var result = new JwtSecurityTokenHandler().WriteToken(token);
            await _repositoryManager.SaveAsync();
            return result;
        }

        //public async Task<string> GenerateJwtTokenAsync(string username, string password)
        //{
        //    var user = await _userRepository.GetUserByNameAsync(username);
        //    if (user == null || user.Password != password) // Ensure password check
        //    {
        //        return ""; // Invalid user or password
        //    }

        //    // Get the roles associated with the user
        //    var roles = await _userRepository.GetRolesByUserIdAsync(user.Id);
        //    if (roles == null || !roles.Any())
        //    {
        //        return ""; // No roles found
        //    }

        //    var roleNames = roles.Select(r => r.Name).ToArray();

        //    // Add claims for roles
        //    var claims = new List<Claim>
        //{
        //    new Claim(ClaimTypes.Name, user.Name ?? "Unknown")
        //};

        //    foreach (var role in roleNames)
        //    {
        //        claims.Add(new Claim(ClaimTypes.Role, role ?? "Unknown"));
        //    }

        //    // Generate JWT token
        //    var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["Jwt:Key"]));
        //    var credentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);
        //    var token = new JwtSecurityToken(
        //        issuer: _configuration["Jwt:Issuer"],
        //        audience: _configuration["Jwt:Audience"],
        //        claims: claims,
        //        expires: DateTime.Now.AddMinutes(30),
        //        signingCredentials: credentials
        //    );
        //    var result = new JwtSecurityTokenHandler().WriteToken(token); 
        //    await _repositoryManager.SaveAsync();
        //    return result;
        //}


        public async Task<bool> RegisterUserWithRoleAsync(RegisterUserDto dto)
        {
            // Create a new user entity from the DTO.
            var user = new User
            {
                Name = dto.Name,
                Email = dto.Email,
                Password = dto.Password, // NOTE: In production, you should hash the password!
                CreatedAt = DateTime.UtcNow,
                UpdatedAt = DateTime.UtcNow
            };
            // Call the repository method to add the user and assign the role.
            if(dto.RoleName == null)
                return false;

            var result = await _userRepository.RegisterUserWithRoleAsync(user, dto.RoleName);
            await _repositoryManager.SaveAsync();
            return result;
        }
    }
}
