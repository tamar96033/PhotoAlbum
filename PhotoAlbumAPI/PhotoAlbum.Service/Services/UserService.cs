using PhotoAlbum.Core.Dto;
using PhotoAlbum.Core.Entities;
using PhotoAlbum.Core.IRepositories;
using PhotoAlbum.Core.IServices;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

namespace PhotoAlbum.Service.Services
{
    public class UserService : IUserService
    {
        private readonly IRepositoryManager _repositoryManager;
        private readonly IUserRepository _userRepository;

        public UserService(IUserRepository userRepository, IRepositoryManager repositoryManager)
        {
            _userRepository = userRepository;
            _repositoryManager = repositoryManager;
        }

        public async Task<IEnumerable<UserDto>> GetAllUsersAsync()
        {
            return await _userRepository.GetAllUsersAsync();
        }

        public async Task<IEnumerable<UserWithPictureDto>> GetAllUsersWithPicturesAsync()
        {
            return await _userRepository.GetAllUsersWithPicturesAsync();
        }


        public User? GetUserFromToken(string token)
        {
            // כאן מפענחים את הטוקן
            // נניח שאתה מפענח JWT פשוט, ומוציא מזה Id ו-Name

            var handler = new System.IdentityModel.Tokens.Jwt.JwtSecurityTokenHandler();
            var jwtToken = handler.ReadJwtToken(token.Replace("Bearer ", ""));

            //var idClaim = jwtToken.Claims.FirstOrDefault(c => c.Type == "id");
            //var nameClaim = jwtToken.Claims.FirstOrDefault(c => c.Type == "name");
            var idClaim = jwtToken.Claims.FirstOrDefault(c => c.Type == ClaimTypes.NameIdentifier);
            var nameClaim = jwtToken.Claims.FirstOrDefault(c => c.Type == ClaimTypes.Name);
            if (idClaim == null || nameClaim == null)
                return null;

            if (!int.TryParse(idClaim.Value, out int userId))
                return null;

            // מביא מהדאטה
            var user = _userRepository.GetUserById(userId);

            // אם תרצה, תוכל לעדכן את השם מהטוקן (בדרך כלל לא כדאי)
            if (user != null)
                user.Name = nameClaim.Value;

            return user;
        }
    }
}
