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

        public AuthService(IConfiguration configuration, IUserRepository userRepository)
        {
            _configuration = configuration;
            _userRepository = userRepository;
        }

        public async Task<string> GenerateJwtTokenAsync(string username, string password)
        {
            var user = await _userRepository.GetUserByNameAsync(username);
            if (user == null || user.Password != password) // Ensure password check
            {
                return null; // Invalid user or password
            }

            // Get the roles associated with the user
            var roles = await _userRepository.GetRolesByUserIdAsync(user.Id);
            if (roles == null || !roles.Any())
            {
                return null; // No roles found
            }

            var roleNames = roles.Select(r => r.Name).ToArray();

            // Add claims for roles
            var claims = new List<Claim>
        {
            new Claim(ClaimTypes.Name, user.Name)
        };

            foreach (var role in roleNames)
            {
                claims.Add(new Claim(ClaimTypes.Role, role));
            }

            // Generate JWT token
            var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["Jwt:Key"]));
            var credentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);
            var token = new JwtSecurityToken(
                issuer: _configuration["Jwt:Issuer"],
                audience: _configuration["Jwt:Audience"],
                claims: claims,
                expires: DateTime.Now.AddMinutes(30),
                signingCredentials: credentials
            );

            return new JwtSecurityTokenHandler().WriteToken(token);
        }


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
            return await _userRepository.RegisterUserWithRoleAsync(user, dto.RoleName);
        }

        //from Malka bruk
        //public string GenerateJwtToken(string username, string[] roles)
        //{
        //    var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["Jwt:Key"]));
        //    var credentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);

        //    var claims = new List<Claim>
        //{
        //    new Claim(ClaimTypes.Name, username)
        //};

        //    // הוספת תפקידים כ-Claims
        //    foreach (var role in roles)
        //    {
        //        claims.Add(new Claim(ClaimTypes.Role, role));
        //    }

        //    var token = new JwtSecurityToken(
        //        issuer: _configuration["Jwt:Issuer"],
        //        audience: _configuration["Jwt:Audience"],
        //        claims: claims,
        //        expires: DateTime.Now.AddMinutes(30),
        //        signingCredentials: credentials
        //    );

        //    return new JwtSecurityTokenHandler().WriteToken(token);
        //}

    }
}
