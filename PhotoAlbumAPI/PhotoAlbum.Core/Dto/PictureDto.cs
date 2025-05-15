using PhotoAlbum.Core.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PhotoAlbum.Core.Dto
{
    public class PictureDto
    {
        public int Id { get; set; }
        public string? Name { get; set; }
        public List<string>? Tags { get; set; } = new List<string>();
        public int UserId { get; set; }
        public string Url { get; set; }

        //for gemini
        public string Base64ImageData { get; set; } = "";

    }
}
