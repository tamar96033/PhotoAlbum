using PhotoAlbum.Core.Dto;
using PhotoAlbum.Core.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PhotoAlbum.Core.IServices
{
    public interface ITagService
    {
        Task<IEnumerable<TagDto>> GetAllTagsAsync();
        Task<bool> CreateTagAsync(Tag tag);
        Task<TagDto?> GetTagByIdAsync(int id);
        Task<bool> UpdateTagAsync(int id, string name);
        Task<bool> DeleteTagAsync(int id);
    }
}
