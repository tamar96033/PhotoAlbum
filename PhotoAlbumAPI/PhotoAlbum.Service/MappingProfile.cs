using AutoMapper;
using PhotoAlbum.Core.Dto;
using PhotoAlbum.Core.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PhotoAlbum.Service
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            //CreateMap<Picture, PictureDto>()
            //    .ForMember(dest => dest.Tags, opt =>
            //        opt.MapFrom(src => src.PictureTags != null
            //            ? src.PictureTags.Select(pt => pt.Tag.Name ?? "").ToList()
            //            : new List<string>()));

            CreateMap<Picture, PictureDto>();

            CreateMap<Tag, TagDto>().ReverseMap();

            CreateMap<Picture, PictureDto>()
    .ForMember(dest => dest.AlbumTitle, opt => opt.MapFrom(src => src.Album != null ? src.Album.Title : null));
    //.ForMember(dest => dest.AlbumUpdatedAt, opt => opt.MapFrom(src => src.Album != null ? src.Album.UpdatedAt : (DateTime?)null));
        }
    }
}   
