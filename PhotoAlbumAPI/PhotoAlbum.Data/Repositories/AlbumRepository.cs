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
    public class AlbumRepository : IAlbumRepository
    {

        private readonly DataContext _context;

        public AlbumRepository(DataContext context)
        {
            _context = context;
        }

        //all the function and logics
        public async Task<List<Album>> GetAlbums()
        {
            return await _context.Albums.ToListAsync();
        }

        public async Task<Album> GetAlbum(int id)
        {
            try
            {
                var album = await _context.Albums.FirstOrDefaultAsync(x => x.Id == id);

                if (album == null)
                {
                    // Handle the case where the album is not found
                    throw new Exception($"Album with Id {id} not found.");
                }

                return album;
            }
            catch (Exception ex)
            {
                // Handle the exception (e.g., log it)
                throw new Exception("An error occurred while retrieving the album.", ex);
            }
        }
    }
}
