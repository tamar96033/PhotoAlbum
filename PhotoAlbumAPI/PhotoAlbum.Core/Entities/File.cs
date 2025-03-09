using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PhotoAlbum.Core.Entities
{
    public class File
    {
        [Key]
        public int FileId { get; set; } 

        [Required]
        [StringLength(100)]
        public string FileName { get; set; }

        [DataType(DataType.DateTime)]
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

        [DataType(DataType.DateTime)]
        public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;
        // Navigation property for the many-to-many relationship
        public virtual ICollection<FileTag> FileTags { get; set; }
    }
}
