using PhotoAlbum.Core.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PhotoAlbum.Core.IServices
{
    public interface IAlbumService
    {
        //the signatures of the services.
        Task<List<Album>> GetAlbumsAsync();
        Task<Album> GetAlbumAsync(int id);
        Task AddAlbumAsync(Album album);
        Task UpdateAlbumAsync(int id, Album album);
        Task DeleteAlbumAsync(int id);
    }
}
