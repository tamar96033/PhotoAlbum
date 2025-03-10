using PhotoAlbum.Core.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PhotoAlbum.Core.IRepositories
{
    public interface IAlbumRepository
    {
        //the signatures of the repositories
        Task<List<Album>?> GetAlbumsAsync();
        Task<Album?> GetAlbumAsync(int id);
        Task<bool> AddAlbumAsync(Album album);
        Task<bool> UpdateAlbumAsync(int id, Album album);   
        Task<bool> DeleteAlbumAsync(int id);
    }
}
