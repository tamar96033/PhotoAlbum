using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PhotoAlbum.Core.Entities
{
    public class FileTag
    {
        [Key]
        public int Id { get; set; }

        [ForeignKey("File")]
        public int FileId { get; set; }

        [ForeignKey("Tag")]
        public int TagId { get; set; }

        // Navigation properties
        public virtual File File { get; set; }
        public virtual Tag Tag { get; set; }
    }
}
