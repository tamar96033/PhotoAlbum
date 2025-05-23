﻿using Microsoft.AspNetCore.Http;
using PhotoAlbum.Core.Dto;
using PhotoAlbum.Core.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PhotoAlbum.Core.IServices
{
    public interface IPictureService
    {
        Task<PictureDto> GetPictureByIdAsync(int id);
        Task AddPictureAsync(PictureDto pictureDto);
        Task<bool> DeletePictureAsync(int id);
        Task<bool> AddTagToPictureAsync(int pictureId, string tagName);
        Task<IEnumerable<PictureDto>> GetAllPicturesAsync();

        /// <summary>
        /// Returns a collection of PictureDto for pictures that have the given tag.
        /// </summary>
        Task<IEnumerable<PictureDto>> GetPicturesByTagAsync(string tagName);
        Task<bool> UpdatePictureAsync(int id, PictureDto updateDto);
        Task<bool> RemoveTagFromPictureAsync(int pictureId, string tagName);
        Task<IEnumerable<PictureDto>> GetPicturesByUserIdAsync(int userId);
        Task<IEnumerable<PictureDto>> GetPicturesByTagAndUserIdAsync(int tagId, int userId);
        //Task<List<object>> UploadPicturesAsync(List<IFormFile> files, int userId);
    }
}
