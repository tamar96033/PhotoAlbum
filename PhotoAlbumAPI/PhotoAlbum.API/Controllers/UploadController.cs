using Amazon.S3;
using Amazon.S3.Model;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using PhotoAlbum.Core.Entities;
using PhotoAlbum.Core.IServices;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using static System.Net.Mime.MediaTypeNames;

namespace PhotoAlbum.API.Controllers
{
    [Authorize]
    [ApiController]
    [Route("api/[controller]")]
    public class UploadController : Controller
    {
        private readonly IAmazonS3 _s3Client;
        private readonly IS3Service _s3Service;
        private readonly IConfiguration _configuration;

        public UploadController(IAmazonS3 s3Client, IS3Service s3Service, IConfiguration configuration)
        {
            _s3Client = s3Client;
            _s3Service = s3Service;
            _configuration = configuration;
        }

        //משיפי
        [HttpPost("upload-file")]
        [Authorize]
        [ProducesResponseType(typeof(object), 200)]  // Success response type
        [ProducesResponseType(typeof(string), 400)]  // Bad request response type (e.g., no file uploaded)
        [ProducesResponseType(typeof(string), 401)]  // Unauthorized response type (e.g., user ID not found in token)
        [ProducesResponseType(typeof(string), 500)]
        public async Task<IActionResult> UploadFile(IFormFile file)
        {
            // שליפת מזהה המשתמש מהטוקן (אם יש לך Claim בשם "NameIdentifier")
            var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;

            if (userId == null)
                return Unauthorized("User ID not found in token.");

            // בדיקת קובץ
            if (file == null || file.Length == 0)
                return BadRequest("No file uploaded.");

            // יצירת שם קובץ ייחודי
            string fileName = Guid.NewGuid().ToString() + Path.GetExtension(file.FileName);
            Console.WriteLine(fileName);

            string bucketName = _configuration["AWS:BucketName"];
            // הגדרת בקשה להעלאת הקובץ ל-S3
            var putRequest = new PutObjectRequest
            {
                BucketName = bucketName,
                Key = fileName,
                InputStream = file.OpenReadStream(),
                ContentType = file.ContentType
            };

            // העלאת הקובץ ל-S3
            var response = await _s3Client.PutObjectAsync(putRequest);

            // אם העלאת הקובץ נכשלה
            if (response.HttpStatusCode != System.Net.HttpStatusCode.OK)
                return StatusCode((int)response.HttpStatusCode, "Error uploading file to S3.");


            var picture = new Picture
            {
                Name = file.FileName,
                CreatedAt = DateTime.Now,
                UpdatedAt = DateTime.Now,
                UserId = int.Parse(userId),
                Url = $"{bucketName}.s3.us-east-1.amazonaws.com/{fileName}"
            };


            // הוספת התמונה למסד הנתונים
            //await _imageService.AddImageAsync(image);

            return Ok();
        }
            

        [HttpGet("upload-url")]
        [Authorize]
        [ProducesResponseType(typeof(object), 200)]  // Success response type
        [ProducesResponseType(typeof(object), 401)]  // Unauthorized response type (for missing user or invalid token)
        [ProducesResponseType(typeof(object), 400)]  // Bad Request if something goes wrong
        public IActionResult GetUploadUrl(string fileName)
        {
            //var userIdClaim = User.FindFirst(ClaimTypes.NameIdentifier)
            //                  ?? User.FindFirst(JwtRegisteredClaimNames.Sub);
            //var userIdClaim = User.FindFirst("Name")?.Value;
            var userIdClaim = User.FindFirst(ClaimTypes.Name)?.Value;
            var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;


            if (userId == null)
                return Unauthorized("User ID not found in token.");

            //var userId = int.Parse(userIdClaim.Value);

            var encodedFileName = Uri.EscapeDataString(fileName);
            
            var key = $"user-uploads/{userId}/{encodedFileName}";
            var url = _s3Service.GeneratePresignedUrl(key);

            return Ok(new { url, key });
        }
    }
}
