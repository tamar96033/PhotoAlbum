﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PhotoAlbum.Core.IServices
{
    public interface IS3Service
    {
        //Task<List<string>> ListFilesAsync();
        string GeneratePresignedUrl(string key);
        Task<string> UploadFileToS3Async(Stream fileStream, string fileName, string contentType);
    }
}
