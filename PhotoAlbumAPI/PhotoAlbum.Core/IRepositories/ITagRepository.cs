using PhotoAlbum.Core.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PhotoAlbum.Core.IRepositories
{
    public interface ITagRepository
    {
        Task<Tag> GetTagByNameAsync(string name);
        Tag AddTag(Tag tag);
        Task<IEnumerable<Tag>> GetAllTagsAsync();
        Task AddTagAsync(Tag tag);
        Task<Tag?> GetTagByIdAsync(int id);
        void UpdateTag(Tag tag);
        void DeleteTag(Tag tag);
    }
}
