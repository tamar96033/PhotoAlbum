﻿using AutoMapper;
using Microsoft.AspNetCore.Http;
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
        private readonly IS3Service _s3Service;
        private readonly IAIPictureService _aiService;
        public PictureService(IPictureRepository pictureRepository, IRepositoryManager repositoryManager, ITagRepository tagRepository, IMapper mapper, IS3Service s3Service, IAIPictureService aIPictureService)
        {
            _pictureRepository = pictureRepository;
            _repositoryManager = repositoryManager;
            _tagRepository = tagRepository;
            _mapper = mapper;
            _s3Service = s3Service;
            _aiService = aIPictureService;
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


        //public async Task AddPictureAsync(string name, List<string> tagNames)
        public async Task AddPictureAsync(PictureDto pictureDto)
        {
            var picture = new Picture
            {
                Name = pictureDto.Name,
                Url = pictureDto.Url,
                CreatedAt = DateTime.Now,
                UpdatedAt = DateTime.Now,
                UserId = pictureDto.UserId,
                PictureTags = new List<PictureTag>()
            };

            //foreach (var tagName in pictureDto.Tags)
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

            //foreach (var tagName in pictureDto.Tags)
            //{
            //    if (string.IsNullOrWhiteSpace(tagName)) continue;

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

            _pictureRepository.AddPicture(picture);
            await _repositoryManager.SaveAsync();
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
            await _pictureRepository.UpdatePictureTagsAsync(id, new List<string>());// updateDto.Tags ??

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

        public async Task<IEnumerable<PictureDto>> GetPicturesByUserIdAsync(int userId)
        {
            var pictures = await _pictureRepository.GetPicturesByUserIdAsync(userId);
            return _mapper.Map<IEnumerable<PictureDto>>(pictures);
        }

        public async Task<IEnumerable<PictureDto>> GetPicturesByTagAndUserIdAsync(int tagId, int userId)
        {
            //the first trying
            return await _pictureRepository.GetPicturesByTagAndUserIdAsync(tagId, userId);

            //second
       //     return await _context.Pictures
       //.Where(p => p.UserId == userId)
       //.Where(p => p.PictureTags.Any(pt => pt.TagId == tagId)) // Filter by tagId
       //.Include(p => p.PictureTags) // Eager load the picture tags
       //.ThenInclude(pt => pt.Tag)  // Optionally include the actual tag object if needed
       //.ToListAsync();
        }


        //public async Task<List<object>> UploadPicturesAsync(List<IFormFile> files, int userId)
        //{
        //    var results = new List<object>();

        //    foreach (var file in files)
        //    {
        //        if (file == null || file.Length == 0)
        //        {
        //            results.Add(new { File = file?.FileName, Error = "Empty file." });
        //            continue;
        //        }

        //        var base64 = await ConvertToBase64(file);
        //        var fileName = Guid.NewGuid().ToString() + Path.GetExtension(file.FileName);

        //        var s3Url = await _s3Service.UploadFileToS3Async(file, fileName, "");
        //        if (s3Url == null)
        //        {
        //            results.Add(new { File = file.FileName, Error = "Failed to upload." });
        //            continue;
        //        }

        //        var picture = new PictureDto
        //        {
        //            Name = Path.GetFileNameWithoutExtension(file.FileName),
        //            UserId = userId,
        //            Url = s3Url,
        //            Base64ImageData = base64
        //        };

        //        var classifyResult = await _aiService.AnalyzeImageAsync(picture, userId);
        //        await _pictureRepository.AddPicture(picture);

        //        results.Add(classifyResult);
        //    }

        //    return results;
        //}

        private async Task<string> ConvertToBase64(IFormFile file)
        {
            using var ms = new MemoryStream();
            await file.CopyToAsync(ms);
            var bytes = ms.ToArray();
            return Convert.ToBase64String(bytes);
        }

    }
}
