using PhotoAlbum.Core.Dto;
using PhotoAlbum.Core.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PhotoAlbum.Core.IRepositories
{
    public interface IPictureRepository
    {
        void AddPicture(Picture picture);
        Task<Picture?> GetPictureByIdAsync(int id);
        void DeletePicture(Picture picture);
        Task<IEnumerable<Picture>> GetAllPicturesAsync();

        //for adding tag
        Task<Picture?> GetPictureWithTagsAsync(int pictureId);
        void AddPictureTag(PictureTag pictureTag);


        /// <summary>
        /// Returns all pictures that have at least one PictureTag whose Tag.Name matches the provided tagName.
        /// </summary>
        Task<IEnumerable<Picture>> GetPicturesByTagAsync(string tagName);
        void UpdatePicture(Picture picture);
        Task UpdatePictureTagsAsync(int pictureId, List<string> tagNames);
        Task<bool> RemoveTagFromPictureAsync(int pictureId, string tagName);
        Task<IEnumerable<Picture>> GetPicturesByUserIdAsync(int userId);
        Task<IEnumerable<PictureDto>> GetPicturesByTagAndUserIdAsync(int tagId, int userId);

        Task<List<Picture>> GetPicturesByAlbumIdAsync(int albumId);
    }
}
