using Amazon.S3;
using Amazon.S3.Model;
using Microsoft.Extensions.Configuration;
using PhotoAlbum.Core.IServices;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PhotoAlbum.Service.Services
{
    public class S3Service : IS3Service
    {
        private readonly IAmazonS3 _s3Client;
        private readonly string _bucketName;

        public S3Service(IAmazonS3 s3Client, IConfiguration configuration)
        {
            _s3Client = s3Client;
            _bucketName = configuration["AWS:BucketName"];
        }

        public async Task<List<string>> ListFilesAsync()
        {
            var request = new ListObjectsV2Request
            {
                BucketName = _bucketName
            };

            var response = await _s3Client.ListObjectsV2Async(request);
            var fileUrls = new List<string>();

            foreach (var obj in response.S3Objects)
            {
                string fileUrl = $"https://{_bucketName}.s3.amazonaws.com/{obj.Key}";
                fileUrls.Add(fileUrl);
            }

            return fileUrls;
        }
    }
}
