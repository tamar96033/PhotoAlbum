using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PhotoAlbum.Core.Dto
{
    public class UserWithPictureDto
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public List<PictureDto> Pictures { get; set; } = new();
    }
}
