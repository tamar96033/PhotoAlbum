using AutoMapper;
using PhotoAlbum.Core.Dto;
using PhotoAlbum.Core.Entities;
using PhotoAlbum.Core.IRepositories;
using PhotoAlbum.Core.IServices;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PhotoAlbum.Service.Services
{
    public class TagService : ITagService
    {
        private readonly ITagRepository _tagRepository;
        private readonly IMapper _mapper;
        private readonly IRepositoryManager _repositoryManager;
        public TagService(ITagRepository tagRepository, IMapper mapper, IRepositoryManager repositoryManager)
        {
            _tagRepository = tagRepository;
            _mapper = mapper;
            _repositoryManager = repositoryManager;
        }

        public async Task<IEnumerable<TagDto>> GetAllTagsAsync()
        {
            var tags = await _tagRepository.GetAllTagsAsync();
            return _mapper.Map<IEnumerable<TagDto>>(tags);
        }//don't return id's

        public async Task<bool> CreateTagAsync(Tag tag)
        {
            if (tag == null)
                return false;

            await _tagRepository.AddTagAsync(tag);
            await _repositoryManager.SaveAsync();
            return true;
        }

        public async Task<TagDto?> GetTagByIdAsync(int id)
        {
            var tag = await _tagRepository.GetTagByIdAsync(id);
            return tag != null ? _mapper.Map<TagDto>(tag) : null;
        }

        public async Task<bool> UpdateTagAsync(int id, string name)
        {
            var tag = await _tagRepository.GetTagByIdAsync(id);
            if (tag == null)
                return false;

            tag.Name = name;
            _tagRepository.UpdateTag(tag);
            await _repositoryManager.SaveAsync();

            return true;
        }

        public async Task<bool> DeleteTagAsync(int id)
        {
            var tag = await _tagRepository.GetTagByIdAsync(id);
            if (tag == null)
                return false;

            _tagRepository.DeleteTag(tag);
            await _repositoryManager.SaveAsync();
            return true;
        }
    }
}
