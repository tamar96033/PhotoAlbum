using Amazon.S3;
using Microsoft.Extensions.Logging;
using PhotoAlbum.Core.Dto;
using PhotoAlbum.Core.Entities;
using PhotoAlbum.Core.IRepositories;
using PhotoAlbum.Core.IServices;
using System;
using System.Collections.Generic;
using System.IO.Compression;
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
        private readonly IPictureRepository _pictureRepository;
        private readonly IAmazonS3 _s3Client;
        private readonly string _bucketName = "photo-alum-tamar-testpnoren";

        public AlbumService(IAlbumRepository albumRepository, ILogger<AlbumService> logger, IRepositoryManager repositoryManager, IPictureRepository pictureRepository, IAmazonS3 amazonS3)
        {
            _albumRepository = albumRepository;
            _logger = logger;
            _repositoryManager = repositoryManager;
            _pictureRepository = pictureRepository;
            _s3Client = amazonS3;
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

        public async Task<AlbumDto?> GetAlbumAsync(int id)
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

        public async Task<IEnumerable<AlbumDto>> GetAlbumsByUserIdAsync(int userId)
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


        //public async Task<byte[]> GetAlbumZipAsync(int albumId)
        //{
        //    var photos = await _pictureRepository.GetPicturesByAlbumIdAsync(albumId);

        //    if (photos == null || !photos.Any())
        //        throw new Exception("No photos found");

        //    using var memoryStream = new MemoryStream();
        //    using (var archive = new ZipArchive(memoryStream, ZipArchiveMode.Create, true))
        //    {
        //        foreach (var photo in photos)
        //        {
        //            var fileBytes = await System.IO.File.ReadAllBytesAsync(photo.Url);

        //            var zipEntry = archive.CreateEntry(photo.Name ?? "photo.jpg", CompressionLevel.Fastest);
        //            using var zipStream = zipEntry.Open();
        //            await zipStream.WriteAsync(fileBytes, 0, fileBytes.Length);
        //        }
        //    }
        //    memoryStream.Position = 0;
        //    return memoryStream.ToArray();
        //}


        public async Task<byte[]> GetAlbumZipAsync(int albumId)
        {
            var photos = await _pictureRepository.GetPicturesByAlbumIdAsync(albumId);
            if (photos == null || !photos.Any())
                throw new Exception("No photos found");

            using var memoryStream = new MemoryStream();
            using (var archive = new ZipArchive(memoryStream, ZipArchiveMode.Create, true))
            {
                foreach (var photo in photos)
                {
                    var key = ExtractKeyFromUrl(photo.Url); // פונקציה שתפצל את ה-Key מתוך ה-URL של S3

                    var response = await _s3Client.GetObjectAsync(_bucketName, key);
                    using var responseStream = response.ResponseStream;

                    var zipEntry = archive.CreateEntry(photo.Name ?? "photo.jpg", CompressionLevel.Fastest);
                    using var zipStream = zipEntry.Open();
                    await responseStream.CopyToAsync(zipStream);
                }
            }
            memoryStream.Position = 0;
            return memoryStream.ToArray();
        }

        private string ExtractKeyFromUrl(string url)
        {
            // נניח שכתובת ה-URL היא כמו https://bucketname.s3.region.amazonaws.com/key
            // מחזירים את ה-key בלבד (החלק אחרי הדומיין)
            var uri = new Uri(url);
            return uri.AbsolutePath.TrimStart('/');
        }
    }
}
