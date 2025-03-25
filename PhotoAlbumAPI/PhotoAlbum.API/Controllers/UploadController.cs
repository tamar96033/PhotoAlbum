using Amazon.S3;
using Amazon.S3.Model;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using PhotoAlbum.Core.IServices;

namespace PhotoAlbum.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class UploadController : Controller
    {
        private readonly IAmazonS3 _s3Client;
        private readonly IS3Service _s3Service;

        public UploadController(IAmazonS3 s3Client, IS3Service s3Service)
        {
            _s3Client = s3Client;
            _s3Service = s3Service;
        }

        [HttpGet("presigned-url")]
        public async Task<IActionResult> GetPresignedUrl([FromQuery] string fileName)
        {
            var request = new GetPreSignedUrlRequest
            {
                BucketName = "photo-album-2-pnoren",
                Key = fileName,
                Verb = HttpVerb.PUT,
                Expires = DateTime.UtcNow.AddMinutes(5),
                ContentType = "image/jpeg" // או סוג הקובץ המתאים
            };

            string url = _s3Client.GetPreSignedURL(request);
            return Ok(new { url });
        }

        [HttpGet("files")]
        public async Task<IActionResult> GetFiles()
        {
            var files = await _s3Service.ListFilesAsync();
            return Ok(files);
        }
    }
}
