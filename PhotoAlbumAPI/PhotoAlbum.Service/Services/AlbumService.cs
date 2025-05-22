using Microsoft.Extensions.Logging;
using PhotoAlbum.Core.Entities;
using PhotoAlbum.Core.IRepositories;
using PhotoAlbum.Core.IServices;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection.Metadata.Ecma335;
using System.Text;
using System.Threading.Tasks;

namespace PhotoAlbum.Service.Services
{
    public class AlbumService : IAlbumService
    {
        private readonly IRepositoryManager _repositoryManager;
        private readonly IAlbumRepository _albumRepository;
        private readonly ILogger<AlbumService> _logger;

        public AlbumService(IAlbumRepository albumRepository, ILogger<AlbumService> logger, IRepositoryManager repositoryManager)
        {
            _albumRepository = albumRepository;
            _logger = logger;
            _repositoryManager = repositoryManager;
        }


        //getting the functions from the IRepositories.
        public async Task<bool> AddAlbumAsync(Album album)
        {
            try
            {
                await _albumRepository.AddAlbumAsync(album);
                await _repositoryManager.SaveAsync();
                return true;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error occurred while adding album in service layer.");
                return false;
            }
        }

        public async Task<bool> DeleteAlbumAsync(int id)
        {
            try
            {
                // Attempt to delete the album
                bool result = await _albumRepository.DeleteAlbumAsync(id);

                if (result)
                {
                    _logger.LogInformation($"Successfully deleted album with id {id}.");
                    await _repositoryManager.SaveAsync();
                }
                else
                {
                    _logger.LogError($"Failed to delete album with id {id}.");
                }

                return result;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, $"An error occurred while deleting album with id {id}.");
                throw;
            }
        }

        public async Task<Album?> GetAlbumAsync(int id)
        {
            try
            {
                return await _albumRepository.GetAlbumAsync(id);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "An error occurred while retrieving albums.");
                throw new Exception("An error occurred while retrieving albums.", ex);
            }
        }

        public async Task<IEnumerable<Album>?> GetAlbumsAsync()
        {
            try
            {
                return await _albumRepository.GetAlbumsAsync();
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "An error occurred while retrieving albums.");
                throw new Exception("An error occurred while retrieving albums.", ex);
            }
        }

        public async Task<bool> UpdateAlbumAsync(int id, Album album)
        {
            if (album == null)
            {
                _logger.LogError($"{nameof(album)} Album cannot be null.");
                throw new ArgumentNullException(nameof(album), "Album cannot be null.");
            }

            try
            {
                var result = await _albumRepository.UpdateAlbumAsync(id, album);

                if (!result)
                {
                    _logger.LogWarning($"Album with ID {id} not found or not updated.");
                }

                return result;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "An error occurred while updating the album with ID {Id}.", id);
                throw new Exception($"An error occurred while updating the album with ID {id}.", ex);
            }
        }

        public async Task<IEnumerable<Album>> GetAlbumsByUserIdAsync(int userId)
        {
            try
            {
                return await _albumRepository.GetAlbumsByUserIdAsync(userId);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error while getting albums by user id.");
                throw;
            }
        }
    }
}
