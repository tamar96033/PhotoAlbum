using PhotoAlbum.Core.Dto;
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
        Task<IEnumerable<Album>?> GetAlbumsAsync();
        Task<AlbumDto?> GetAlbumAsync(int id);
        Task<Album> AddAlbumAsync(Album album);
        Task<bool> UpdateAlbumAsync(int id, Album album);   
        Task<bool> DeleteAlbumAsync(int id);
        Task<Album?> GetByTitleAsync(string title);
        Task<IEnumerable<AlbumDto>> GetAlbumsByUserIdAsync(int userId);
    }
}
