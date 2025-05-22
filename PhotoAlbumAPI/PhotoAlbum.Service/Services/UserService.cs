using PhotoAlbum.Core.Dto;
using PhotoAlbum.Core.Entities;
using PhotoAlbum.Core.IRepositories;
using PhotoAlbum.Core.IServices;
using System;
using System.Collections.Generic;
using System.Linq;
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

        public async Task<IEnumerable<User>> GetAllUsersAsync()
        {
            return await _userRepository.GetAllUsersAsync();
        }

        public async Task<IEnumerable<UserWithPictureDto>> GetAllUsersWithPicturesAsync()
        {
            return await _userRepository.GetAllUsersWithPicturesAsync();
        }
    }
}
