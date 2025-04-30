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

        public S3Service(IConfiguration configuration)
        {
            _bucketName = configuration["AWS:BucketName"];
            var region = Amazon.RegionEndpoint.GetBySystemName(configuration["AWS:Region"]);

            _s3Client = new AmazonS3Client(
                configuration["AWS:AWS_ACCESS_KEY_ID"],
                configuration["AWS:AWS_SECRET_ACCESS_KEY"],
                new AmazonS3Config { RegionEndpoint = region }
            );
        }

        public string GeneratePresignedUrl(string key)
        {
            var request = new GetPreSignedUrlRequest
            {
                BucketName = _bucketName,
                Key = key,
                Verb = HttpVerb.PUT,
                Expires = DateTime.UtcNow.AddMinutes(10)
            };

            return _s3Client.GetPreSignedURL(request);
        }

        public async Task<string> UploadFileToS3Async(Stream fileStream, string fileName, string contentType)
        {
            var putRequest = new PutObjectRequest
            {
                BucketName = _bucketName,
                Key = $"user-uploads/{fileName}", // אתה יכול לשלב פה גם את ה-userId אם צריך
                InputStream = fileStream,
                ContentType = contentType,
                AutoCloseStream = true
            };

            try
            {
                var response = await _s3Client.PutObjectAsync(putRequest);
                return $"https://{_bucketName}.s3.amazonaws.com/user-uploads/{fileName}"; // מחזיר את ה-URL של הקובץ
            }
            catch (AmazonS3Exception e)
            {
                throw new Exception($"Error uploading file to S3: {e.Message}");
            }
        }

        //public S3Service(IAmazonS3 s3Client, IConfiguration configuration)
        //{
        //    _s3Client = s3Client;
        //    _bucketName = configuration["AWS:BucketName"];
        //}

        //public async Task<List<string>> ListFilesAsync()
        //{
        //    var request = new ListObjectsV2Request
        //    {
        //        BucketName = _bucketName
        //    };

        //    var response = await _s3Client.ListObjectsV2Async(request);
        //    var fileUrls = new List<string>();

        //    foreach (var obj in response.S3Objects)
        //    {
        //        string fileUrl = $"https://{_bucketName}.s3.amazonaws.com/{obj.Key}";
        //        fileUrls.Add(fileUrl);
        //    }

        //    return fileUrls;
        //}
    }
}
