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
    public class TagRepository : ITagRepository
    {
        private readonly DataContext _context;
        public TagRepository(DataContext context)
        {
            _context = context;
        }

        public async Task<Tag?> GetTagByNameAsync(string name)
        {
            return await _context.Tags.FirstOrDefaultAsync(t => t.Name == name);
        }

        public Tag AddTag(Tag tag)
        {
            _context.Tags.Add(tag);
            return tag; // now tag.TagId is populated
        }

        public async Task<IEnumerable<Tag>> GetAllTagsAsync()
        {
            return await _context.Tags.ToListAsync();
        }

        public async Task AddTagAsync(Tag tag)
        {
            await _context.Tags.AddAsync(tag);
        }

        public async Task<Tag?> GetTagByIdAsync(int id)
        {
            return await _context.Tags.FindAsync(id);
        }

        public void UpdateTag(Tag tag)
        {
            _context.Tags.Update(tag);
        }
        public void DeleteTag(Tag tag)
        {
            _context.Tags.Remove(tag);
        }
    }
}
