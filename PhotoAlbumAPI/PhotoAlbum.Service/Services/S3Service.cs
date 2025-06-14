﻿using Amazon;
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
            _bucketName = configuration["BucketName"];
            var region = Amazon.RegionEndpoint.GetBySystemName(configuration["Region"]);

            _s3Client = new AmazonS3Client(
                configuration["AWS_ACCESS_KEY_ID"],
                configuration["AWS_SECRET_ACCESS_KEY"],
                 //new AmazonS3Config { RegionEndpoint = region }
                 new AmazonS3Config
                 {
                     RegionEndpoint = RegionEndpoint.USEast1, // or your region
                     ForcePathStyle = false, // important: use virtual-hosted–style URLs
                     UseAccelerateEndpoint = false
                 }
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

    }
}
