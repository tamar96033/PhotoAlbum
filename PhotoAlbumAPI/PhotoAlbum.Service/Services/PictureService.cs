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
    public class PictureService : IPictureService
    {
        private readonly IPictureRepository _pictureRepository;
        private readonly IRepositoryManager _repositoryManager;
        private readonly ITagRepository _tagRepository;
        private readonly IMapper _mapper; 

        public PictureService(IPictureRepository pictureRepository, IRepositoryManager repositoryManager, ITagRepository tagRepository, IMapper mapper)
        {
            _pictureRepository = pictureRepository;
            _repositoryManager = repositoryManager;
            _tagRepository = tagRepository;
            _mapper = mapper;
        }


        public async Task<PictureDto> GetPictureByIdAsync(int id)
        {
            var picture = await _pictureRepository.GetPictureByIdAsync(id);

            if (picture == null)
            {
                return new PictureDto(); // Or throw exception if needed
            }

            // Mapping the picture to PictureDto and including the tags
            var pictureDto = _mapper.Map<PictureDto>(picture);

            // Now populate the tags
            //pictureDto.Tags = picture.PictureTags?.Select(pt => pt.Tag.Name ?? "").ToList() ?? new List<string>();

            return pictureDto;
        }
        public async Task AddPictureAsync(string name, List<string> tagNames)
        {
            //var picture = new Picture
            //{
            //    Name = name,
            //    PictureTags = new List<PictureTag>()
            //};

            //foreach (var tagName in tagNames)
            //{
            //    var tag = await _tagRepository.GetTagByNameAsync(tagName);
            //    if (tag == null)
            //    {
            //        tag = _tagRepository.AddTag(new Tag { Name = tagName });
            //    }

            //    picture.PictureTags.Add(new PictureTag
            //    {
            //        TagId = tag.Id,
            //        Tag = tag
            //    });
            //}

            //_pictureRepository.AddPicture(picture);
            //await _repositoryManager.SaveAsync();
        }

        public async Task<bool> DeletePictureAsync(int id)
        {
            var picture = await _pictureRepository.GetPictureByIdAsync(id);
            if (picture == null)
                return false;

            _pictureRepository.DeletePicture(picture);
            await _repositoryManager.SaveAsync();
            return true;
        }

        public async Task<bool> AddTagToPictureAsync(int pictureId, string tagName)
        {
            var picture = await _pictureRepository.GetPictureWithTagsAsync(pictureId);
            if (picture == null) return false;

            // Check if the tag already exists
            var tag = await _tagRepository.GetTagByNameAsync(tagName);
            if (tag == null)
            {
                tag = _tagRepository.AddTag(new Tag { Name = tagName });
            }

            // Prevent duplicate PictureTag
            //if (picture.PictureTags.Any(pt => pt.TagId == tag.Id))
                //return true; // Tag already associated

            var pictureTag = new PictureTag
            {
                PictureId = pictureId,
                TagId = tag.Id
            };

            _pictureRepository.AddPictureTag(pictureTag);

            await _repositoryManager.SaveAsync();
            return true;
        }

        public async Task<IEnumerable<PictureDto>> GetAllPicturesAsync()
        {
            var pictures = await _pictureRepository.GetAllPicturesAsync();
            return _mapper.Map<IEnumerable<PictureDto>>(pictures);
        }

        public async Task<IEnumerable<PictureDto>> GetPicturesByTagAsync(string tagName)
        {
            var pictures = await _pictureRepository.GetPicturesByTagAsync(tagName);
            return _mapper.Map<IEnumerable<PictureDto>>(pictures);
        }

        public async Task<bool> UpdatePictureAsync(int id, PictureDto updateDto)
        {
            var picture = await _pictureRepository.GetPictureByIdAsync(id);
            if (picture == null)
                return false;

            // Update picture properties
            picture.Name = updateDto.Name ?? "";
            // Update other fields as needed

            // Update the picture in the repository
            _pictureRepository.UpdatePicture(picture);

            // Now update the tags using the repository method
            await _pictureRepository.UpdatePictureTagsAsync(id, updateDto.Tags ?? new List<string>());

            // Save all changes
            await _repositoryManager.SaveAsync();
            return true;
        }
        
        public async Task<bool> RemoveTagFromPictureAsync(int pictureId, string tagName)
        {
            var result = await _pictureRepository.RemoveTagFromPictureAsync(pictureId, tagName);
            await _repositoryManager.SaveAsync();
            return result;
        }
    }
}
