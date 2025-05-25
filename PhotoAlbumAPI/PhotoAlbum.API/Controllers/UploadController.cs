using Amazon.S3;
using Amazon.S3.Model;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using PhotoAlbum.Core.Dto;
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
        private readonly IPictureService _pictureService;
        private readonly IAIPictureService _aIPictureService;


        public UploadController(IAmazonS3 s3Client, IS3Service s3Service, IConfiguration configuration, IPictureService pictureService, IAIPictureService aIPictureService)
        {
            _s3Client = s3Client;
            _s3Service = s3Service;
            _configuration = configuration;
            _pictureService = pictureService;
            _aIPictureService = aIPictureService;
        }


        [HttpPost("upload-file")]
        [Authorize]
        [ProducesResponseType(typeof(object), 200)]  // Success response type
        [ProducesResponseType(typeof(string), 400)]  // Bad request response type (e.g., no file uploaded)
        [ProducesResponseType(typeof(string), 401)]  // Unauthorized response type (e.g., user ID not found in token)
        [ProducesResponseType(typeof(string), 500)]
        public async Task<IActionResult> UploadFile(IFormFile file)
        {
            // Get the userId from the token (if you have a claim named "NameIdentifier")
            var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;

            if (userId == null)
                return Unauthorized("User ID not found in token.");

            // Validate the uploaded file
            if (file == null || file.Length == 0)
                return BadRequest("No file uploaded.");

            // Validate tags (optional: you can split by commas and validate the tags)
            //var tagList = tags?.Split(',').Select(tag => tag.Trim()).ToList() ?? new List<string>();

            // Generate a unique file name
            var fileName = Guid.NewGuid().ToString() + Path.GetExtension(file.FileName);
            Console.WriteLine(fileName);

            var bucketName = _configuration["AWS:BucketName"];

            // Convert the image to Base64
            var base64Image = await ConvertImageToBase64Async(file);

            // Log the Base64 string (optional, can be removed after testing)
            Console.WriteLine($"Base64 Image: {base64Image}");

            // Define the request to upload the file to S3
            var putRequest = new PutObjectRequest
            {
                BucketName = bucketName,
                Key = fileName,
                InputStream = file.OpenReadStream(),
                ContentType = file.ContentType
            };

            // Upload the file to S3
            var response = await _s3Client.PutObjectAsync(putRequest);

            // If the upload fails
            if (response.HttpStatusCode != System.Net.HttpStatusCode.OK)
                return StatusCode((int)response.HttpStatusCode, "Error uploading file to S3.");

            // Create the PictureDto object, including the Base64 image and tags
            var picture = new PictureDto
            {
                Name = Path.GetFileNameWithoutExtension(file.FileName) ?? $"Unnamed_{Guid.NewGuid()}",
                UserId = int.Parse(userId),
                Url = $"https://{bucketName}.s3.us-east-1.amazonaws.com/{fileName}",
                //Tags = tagList,
                Base64ImageData = base64Image
            };
            var classify = await _aIPictureService.AnalyzeImageAsync(picture, int.Parse(userId));
            // Optionally, store or process the Base64 image in your database or other service
            // picture.Base64Image = base64Image;

            // Add the picture to the database (you can use the Base64 if needed later)
            await _pictureService.AddPictureAsync(picture);

            return Ok(classify);
        }

        // Method to convert the image file to Base64
        private async Task<string> ConvertImageToBase64Async(IFormFile imageFile)
        {
            using (var memoryStream = new MemoryStream())
            {
                // Copy the file content into the memory stream
                await imageFile.CopyToAsync(memoryStream);

                // Convert the memory stream to a byte array
                byte[] imageBytes = memoryStream.ToArray();

                // Convert the byte array to Base64
                return Convert.ToBase64String(imageBytes);
            }
        }

        //public async Task<IActionResult> UploadFile(IFormFile file, [FromForm] string tags)
        //{
        //    // שליפת מזהה המשתמש מהטוקן (אם יש לך Claim בשם "NameIdentifier")
        //    var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;

        //    if (userId == null)
        //        return Unauthorized("User ID not found in token.");

        //    // בדיקת קובץ
        //    if (file == null || file.Length == 0)
        //        return BadRequest("No file uploaded.");

        //    // Validate tags (optional: you can split by commas and validate the tags)
        //    var tagList = tags?.Split(',').Select(tag => tag.Trim()).ToList() ?? new List<string>();


        //    // יצירת שם קובץ ייחודי
        //    string fileName = Guid.NewGuid().ToString() + Path.GetExtension(file.FileName);
        //    Console.WriteLine(fileName);

        //    string bucketName = _configuration["AWS:BucketName"];


        //    // הגדרת בקשה להעלאת הקובץ ל-S3
        //    var putRequest = new PutObjectRequest
        //    {
        //        BucketName = bucketName,
        //        Key = fileName,
        //        InputStream = file.OpenReadStream(),
        //        ContentType = file.ContentType
        //    };

        //    // העלאת הקובץ ל-S3
        //    var response = await _s3Client.PutObjectAsync(putRequest);

        //    // אם העלאת הקובץ נכשלה
        //    if (response.HttpStatusCode != System.Net.HttpStatusCode.OK)
        //        return StatusCode((int)response.HttpStatusCode, "Error uploading file to S3.");

        //    ////////////////////////have to treat in the tags!!!!!!!!!!!!
        //    var picture = new PictureDto
        //    {
        //        Name = Path.GetFileNameWithoutExtension(file.FileName) ?? $"Unnamed_{Guid.NewGuid()}",
        //        UserId = int.Parse(userId),
        //        Url = $"https://{bucketName}.s3.us-east-1.amazonaws.com/{fileName}",
        //        Tags = tagList
        //    };


        //    // הוספת התמונה למסד הנתונים
        //    await _pictureService.AddPictureAsync(picture);
        //    //Response.ContentType = "application/json";




        //    return Ok("the file uploaded successfully");
        //}



        //[HttpPost("upload-multiple")]
        //[Authorize]
        //[ProducesResponseType(typeof(List<object>), 200)]
        //[ProducesResponseType(typeof(string), 400)]
        //[ProducesResponseType(typeof(string), 401)]
        //[ProducesResponseType(typeof(string), 500)]
        //public async Task<IActionResult> UploadMultipleFiles([FromForm] List<IFormFile> files)
        //{
        //    var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
        //    if (userId == null) return Unauthorized("User ID not found.");

        //    if (files == null || files.Count == 0)
        //        return BadRequest("No files uploaded.");

        //    var result = await _pictureService.UploadPicturesAsync(files, int.Parse(userId));
        //    return Ok(result);
        //}

        [HttpPost("upload-multiple")]
        [Authorize]
        [ProducesResponseType(typeof(List<object>), 200)]
        [ProducesResponseType(typeof(string), 400)]
        [ProducesResponseType(typeof(string), 401)]
        [ProducesResponseType(typeof(string), 500)]
        public async Task<IActionResult> UploadMultipleFiles(List<IFormFile> files)
        {
            var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            if (userId == null)
                return Unauthorized("User ID not found in token.");

            if (files == null || !files.Any())
                return BadRequest("No files uploaded.");

            var bucketName = _configuration["AWS:BucketName"];
            var results = new List<object>();

            foreach (var file in files)
            {
                if (file == null || file.Length == 0)
                {
                    results.Add(new { File = file?.FileName, Error = "Empty or null file." });
                    continue;
                }

                var fileName = Guid.NewGuid().ToString() + Path.GetExtension(file.FileName);
                var base64Image = await ConvertImageToBase64Async(file);

                var putRequest = new PutObjectRequest
                {
                    BucketName = bucketName,
                    Key = fileName,
                    InputStream = file.OpenReadStream(),
                    ContentType = file.ContentType
                };

                var response = await _s3Client.PutObjectAsync(putRequest);
                if (response.HttpStatusCode != System.Net.HttpStatusCode.OK)
                {
                    results.Add(new { File = file.FileName, Error = "Failed to upload to S3." });
                    continue;
                }

                var picture = new PictureDto
                {
                    Name = Path.GetFileNameWithoutExtension(file.FileName) ?? $"Unnamed_{Guid.NewGuid()}",
                    UserId = int.Parse(userId),
                    Url = $"https://{bucketName}.s3.us-east-1.amazonaws.com/{fileName}",
                    Base64ImageData = base64Image
                };

                var classifyResult = await _aIPictureService.AnalyzeImageAsync(picture, int.Parse(userId));
                await _pictureService.AddPictureAsync(picture);

                results.Add(classifyResult);
            }

            return Ok(results);
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

        [HttpPut]
        [Authorize]
        public async Task<IActionResult> UpdatePictureInDb(string name, string url)//, List<string> tags
        {
            var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;

            var picture = new PictureDto
            {
                Name = name,
                UserId = int.Parse(userId),
                Url = url,
                //Tags = tags,
            };

            await _pictureService.AddPictureAsync(picture);
            return Ok(picture);
        }



        [HttpGet("presigned-url")]
        [Authorize]
        [ProducesResponseType(typeof(object), 200)]  
        [ProducesResponseType(typeof(string), 400)]
        public IActionResult GetPresignedUrl([FromQuery] string key)
        {
            if (string.IsNullOrEmpty(key))
                return BadRequest("Missing object key.");

            var request = new GetPreSignedUrlRequest
            {
                BucketName = "photo-alum-tamar-testpnoren",
                Key = key,
                Expires = DateTime.UtcNow.AddMinutes(15),
                Verb = HttpVerb.GET
            };

            var url = _s3Client.GetPreSignedURL(request);
            return Ok(new { url });
        }
    }
}
