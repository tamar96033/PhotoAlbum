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
    public class AlbumService : IAlbumService
    {
        private readonly IAlbumRepository _albumRepository;

        public AlbumService(IAlbumRepository albumRepository)
        {
            _albumRepository = albumRepository;
        }


        //getting the functions from the IRepositories.
        public Task AddAlbumAsync(Album album)
        {
            return _albumRepository.AddAlbumAsync(album);
        }

        public Task DeleteAlbumAsync(int id)
        {
            return _albumRepository.DeleteAlbumAsync(id);
        }

        public Task<Album> GetAlbumAsync(int id)
        {
            return _albumRepository.GetAlbumAsync(id);
        }

        public Task<List<Album>> GetAlbumsAsync()
        {
            return _albumRepository.GetAlbumsAsync();
        }

        public Task UpdateAlbumAsync(int id, Album album)
        {
            return _albumRepository.UpdateAlbumAsync(id, album);
        }

    }
}
