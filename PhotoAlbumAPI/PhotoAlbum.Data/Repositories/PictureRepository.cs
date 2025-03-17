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
    public class PictureRepository : IPictureRepository
    {
        private readonly DataContext _context;

        public PictureRepository(DataContext context)
        {
            _context = context;
        }

        public void AddPicture(Picture picture)
        {
            _context.Pictures.Add(picture);
        }

        public async Task<Picture?> GetPictureByIdAsync(int id)
        {
            return await _context.Pictures
        .Include(p => p.PictureTags)  // Ensure PictureTags are included
        .ThenInclude(pt => pt.Tag)   // Ensure the associated Tag is included
        .FirstOrDefaultAsync(p => p.Id == id);
        }

        public void DeletePicture(Picture picture)
        {
            // Remove related PictureTags first
            _context.PictureTags.RemoveRange(picture.PictureTags);

            // Then remove the Picture itself
            _context.Pictures.Remove(picture);
            //the saving will be in the service
            //await _context.SaveChangesAsync();
        }

        public void AddPictureTag(PictureTag pictureTag)
        {
            _context.PictureTags.Add(pictureTag);
        }

        public async Task<Picture?> GetPictureWithTagsAsync(int pictureId)
        {
            return await _context.Pictures
                .Include(p => p.PictureTags)
                .ThenInclude(pt => pt.Tag)
                .FirstOrDefaultAsync(p => p.Id == pictureId);
        }

        public async Task<IEnumerable<Picture>> GetAllPicturesAsync()
        {
            return await _context.Pictures
                .Include(p => p.PictureTags)
                    .ThenInclude(pt => pt.Tag)
                .ToListAsync();
        }

        public async Task<IEnumerable<Picture>> GetPicturesByTagAsync(string tagName)
        {
            return await _context.Pictures
                .Include(p => p.PictureTags)
                    .ThenInclude(pt => pt.Tag)
                .Where(p => p.PictureTags.Any(pt => pt.Tag.Name == tagName))
                .ToListAsync();
        }
        public void UpdatePicture(Picture picture)
        {
            _context.Pictures.Update(picture);
        }

        public async Task UpdatePictureTagsAsync(int pictureId, List<string> tagNames)
        {
            var picture = await _context.Pictures.Include(p => p.PictureTags).ThenInclude(pt => pt.Tag)
                                                  .FirstOrDefaultAsync(p => p.Id == pictureId);

            if (picture == null)
                throw new ArgumentException("Picture not found", nameof(pictureId));

            // Remove existing tags
            var existingTags = picture.PictureTags.ToList();
            _context.PictureTags.RemoveRange(existingTags);

            // Add new tags
            if (tagNames != null)
            {
                foreach (var tagName in tagNames)
                {
                    var tag = await _context.Tags.FirstOrDefaultAsync(t => t.Name == tagName);
                    if (tag != null)
                    {
                        picture.PictureTags.Add(new PictureTag { PictureId = picture.Id, TagId = tag.Id });
                    }
                    else
                    {
                        var newTag = new Tag { Name = tagName };
                        _context.Tags.Add(newTag);
                        await _context.SaveChangesAsync(); // Save to get the new tag's ID
                        picture.PictureTags.Add(new PictureTag { PictureId = picture.Id, TagId = newTag.Id });
                    }
                }
            }
        }

        public async Task<bool> RemoveTagFromPictureAsync(int pictureId, string tagName)
        {
            var picture = await _context.Pictures
                .Include(p => p.PictureTags)
                .ThenInclude(pt => pt.Tag)
                .FirstOrDefaultAsync(p => p.Id == pictureId);

            if (picture == null)
                return false;

            var pictureTag = picture.PictureTags.FirstOrDefault(pt => pt.Tag.Name == tagName);
            if (pictureTag == null)
                return false;

            _context.PictureTags.Remove(pictureTag);
            return true;
        }
    }
}
