using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using PhotoAlbum.Core.Entities;
using PhotoAlbum.Core.IRepositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PhotoAlbum.Data.Repositories
{
    public class AlbumRepository : IAlbumRepository
    {

        private readonly DataContext _context;
        private readonly ILogger<AlbumRepository> _logger;

        public AlbumRepository(DataContext context, ILogger<AlbumRepository> logger)
        {
            _context = context;
            _logger = logger;
        }

        //all the function and logics
        public async Task<IEnumerable<Album>?> GetAlbumsAsync()
        {
            try
            {
                return await _context.Albums.ToListAsync();
            }
            catch (DbUpdateException dbEx)
            {
                _logger.LogError($"An error occurred while accessing the database. {dbEx}");
                throw;
            }
            catch (Exception ex)
            {
                _logger.LogError($"An unexpected error occurred. {ex}");
                throw;
            }
        }

        public async Task<Album?> GetAlbumAsync(int id)
        {
            try
            {
                return await _context.Albums.FindAsync(id);
            }
            catch (DbUpdateException dbEx)
            {
                // Handle database update exceptions
                _logger.LogError($"An error occurred while accessing the database.: {dbEx}");
                throw;
            }
            catch (Exception ex)
            {
                // Handle other exceptions
                _logger.LogError($"An unexpected error occurred. {ex}");
                throw;
            }
            //try
            //{
            //    var album = await _context.Albums.FirstOrDefaultAsync(x => x.Id == id);

            //    if (album == null)
            //    {
            //        _logger.LogWarning($"Album {id} is not found");
            //        // Handle the case where the album is not found
            //        //throw new Exception($"Album with Id {id} not found.");
            //    }

            //    return album;
            //}
            //catch (Exception ex)
            //{
            //    _logger.LogError(ex, $"An error occurred while retrieving the album with Id {id} at {DateTime.UtcNow}");
            //    throw;
            //}
        }

        public async Task<Album> AddAlbumAsync(Album album)
        {
            //if (album == null)
            //{
            //    throw new ArgumentNullException(nameof(album), "Album cannot be null.");
            //}

            //try
            //{
            //    await _context.Albums.AddAsync(album);
            //    return true;
            //}
            //catch (DbUpdateException dbEx)
            //{
            //    _logger.LogError(dbEx, "Database update error occurred while adding album.");
            //    throw new Exception("Database update error occurred.", dbEx);
            //}
            //catch (Exception ex)
            //{
            //    _logger.LogError(ex, "An error occurred while adding the album.");
            //    throw new Exception("An error occurred while adding the album.", ex);
            //}
            if (album == null)
                throw new ArgumentNullException(nameof(album));

            try
            {
                var result = await _context.Albums.AddAsync(album);
                await _context.SaveChangesAsync(); // חשוב לשמור
                return result.Entity;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error while adding album.");
                throw;
            }
        }

        public async Task<bool> UpdateAlbumAsync(int id, Album album)
        {
            if (album == null)
            {
                throw new ArgumentNullException(nameof(album));
            }

            var existingAlbum = await _context.Albums.FirstOrDefaultAsync(x => x.Id == id);
            if (existingAlbum == null)
            {
                _logger.LogWarning($"Album with ID {id} not found.");
                return false; // Album not found
            }

            existingAlbum.Description = album.Description;
            existingAlbum.Title = album.Title;
            existingAlbum.UpdatedAt = DateTime.UtcNow;
            existingAlbum.CreatedAt = album.CreatedAt;
            existingAlbum.UserId = album.UserId;

            return true; // Update successful
        }

        public async Task<bool> DeleteAlbumAsync(int id)
        {
            var album = await _context.Albums.FindAsync(id);
            if (album == null)
            {
                _logger.LogWarning($"The album with ID: {id} was not found.");
                return false; // Indicate that the album was not found
            }

            _context.Albums.Remove(album);

            return true; // Indicate that the deletion was successful
        }

        public async Task<Album?> GetByTitleAsync(string title) =>
            await _context.Albums.FirstOrDefaultAsync(a => a.Title == title);


        public async Task<IEnumerable<Album>> GetAlbumsByUserIdAsync(int userId)
        {
            return await _context.Albums
                .Where(a => a.UserId == userId)
                .ToListAsync();
        }
    }
}
