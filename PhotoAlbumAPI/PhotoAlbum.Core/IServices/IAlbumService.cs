﻿using PhotoAlbum.Core.Entities;
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
        Task<List<Album>?> GetAlbumsAsync();
        Task<Album?> GetAlbumAsync(int id);
        Task<bool> AddAlbumAsync(Album album);
        Task<bool> UpdateAlbumAsync(int id, Album album);
        Task<bool> DeleteAlbumAsync(int id);
    }
}
