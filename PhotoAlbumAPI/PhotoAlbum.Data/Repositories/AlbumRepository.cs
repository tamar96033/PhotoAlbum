using Microsoft.AspNet.Mvc;
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
        public async Task<List<Album>> GetAlbumsAsync()
        {
            return await _context.Albums.ToListAsync();
        }

        public async Task<Album> GetAlbumAsync(int id)
        {
            try
            {
                var album = await _context.Albums.FirstOrDefaultAsync(x => x.Id == id);

                if (album == null)
                {
                    _logger.LogWarning($"Album {id} is not found");
                    // Handle the case where the album is not found
                    //throw new Exception($"Album with Id {id} not found.");
                }

                return album;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, $"An error occurred while retrieving the album with Id {id} at {DateTime.UtcNow}");
                throw;
            }
        }

        public async Task AddAlbumAsync(Album album)
        {
            try
            {
                await _context.Albums.AddAsync(album);
            }
            catch (Exception ex)
            {
                _logger.LogError($"{ex.Message}", ex);
                throw;
            }
            await _context.SaveChangesAsync();
        }

        public async Task UpdateAlbumAsync(int id, Album album)
        {
            try
            {
                var al = await _context.Albums.FirstOrDefaultAsync(x => x.Id == id);
                if (al == null)
                {
                    _logger.LogWarning("the album of updateAlbum is null, there isn't this album");
                }
                else
                {
                    al.Description = album.Description;
                    al.Title = album.Title;
                    al.UpdatedAt = album.UpdatedAt;
                    al.CreatedAt = album.CreatedAt;
                }
            }
            catch (Exception ex)
            {
                // Log the exception (consider using a logging framework)
                _logger.LogError(ex, "An error occurred while updating the album.");
                throw;
            }
            await _context.SaveChangesAsync();
        }

        public async Task DeleteAlbumAsync(int id)
        {

            var album = await _context.Albums.FindAsync(id);
            if (album == null)
            {
                _logger.LogWarning($"the album with id: {id} is not found ");
            }
            else
            {
                _context.Albums.Remove(album);
                await _context.SaveChangesAsync();
            }
        }
    }
}
