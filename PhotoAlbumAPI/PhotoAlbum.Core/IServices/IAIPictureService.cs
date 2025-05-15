using PhotoAlbum.Core.Dto;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PhotoAlbum.Core.IServices
{
    public interface IAIPictureService
    {
        Task<string> AnalyzeImageAsync(PictureDto imageRequest);
    }
}
