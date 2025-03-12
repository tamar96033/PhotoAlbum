using Amazon.S3;
using Amazon.S3.Model;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace PhotoAlbum.API.Controllers
{
    public class UploadController : Controller
    {
        //later...
        //private readonly IAmazonS3 _s3Client;

        //public UploadController(IAmazonS3 s3Client)
        //{
        //    _s3Client = s3Client;
        //}

        [HttpGet("presigned-url")]
        public async Task<IActionResult> GetPresignedUrl([FromQuery] string fileName)
        {
            //var request = new GetPreSignedUrlRequest
            //{
            //    BucketName = "your-bucket-name",
            //    Key = fileName,
            //    Verb = HttpVerb.PUT,
            //    Expires = DateTime.UtcNow.AddMinutes(5),
            //    ContentType = "image/jpeg" // או סוג הקובץ המתאים
            //};

            //string url = _s3Client.GetPreSignedURL(request);
            //return Ok(new { url });
            return Ok("later: I have return the full url");
        }
    }
}
