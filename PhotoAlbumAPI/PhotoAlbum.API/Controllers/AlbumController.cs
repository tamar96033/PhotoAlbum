using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using PhotoAlbum.Core.Entities;
using PhotoAlbum.Core.IServices;
using System.Security.Claims;

namespace PhotoAlbum.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class AlbumController : Controller
    {
        private readonly IAlbumService _albumService;
        private readonly ILogger<AlbumController> _logger;
         
        public AlbumController(IAlbumService albumService, ILogger<AlbumController> logger)
        {
            _albumService = albumService;
            _logger = logger;
        }


        //getting the functions from the service
        [HttpGet]
        [Authorize(Policy = "AdminOnly")]//this is only example to the Policy!!!! - don't leave it
        [ProducesResponseType(typeof(IEnumerable<Album>), StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        [Authorize]
        public async Task<IActionResult> GetAlbumsAsync()
        {
            try
            {
                var albums = await _albumService.GetAlbumsAsync();

                if (albums == null || !albums.Any())
                {
                    _logger.LogWarning("No albums found.");
                    return NotFound("No albums available.");
                }

                //_logger.LogInformation("Successfully retrieved albums.");
                return Ok(albums);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "An error occurred while retrieving albums.");
                return StatusCode(500, "An internal server error occurred.");
            }
        }
        
        [HttpGet("album-by-id")]
        [ProducesResponseType(typeof(Album), StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public async Task<IActionResult> GetAlbumAsync(int id)
        {
            try
            {
                var album = await _albumService.GetAlbumAsync(id);

                if (album == null)
                {
                    _logger.LogWarning($"Album with id {id} not found.");
                    return NotFound();
                }

                //_logger.LogInformation($"Successfully retrieved album with id {id}.");
                return Ok(album);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "An error occurred while getting the album.");
                return StatusCode(500, "Internal server error");
            }
        }


        [HttpPost]
        [ProducesResponseType(typeof(Album), StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public async Task<IActionResult> AddAlbumAsync([FromBody] Album album)
        {
            if (album == null)
            {
                return BadRequest("Album cannot be null.");
            }

            try
            {
                var result = await _albumService.AddAlbumAsync(album);
                if (!result)
                {
                    _logger.LogError("Failed to add the album due to an internal error.");
                    return StatusCode(500, "Failed to add the album due to an internal error.");
                }

                _logger.LogInformation($"Album added successfully: {album.Title}");
                return Ok(album);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "An exception occurred while adding the album.");
                return StatusCode(500, "Internal server error");
            }
        }


        [HttpPut("id")]
        [ProducesResponseType(typeof(Album), StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public async Task<IActionResult> UpdateAlbumAsync(int id, [FromBody] Album album)
        {
            try
            {
                var result = await _albumService.UpdateAlbumAsync(id, album);
                if (!result)
                {
                    _logger.LogError("Failed to update the album due to an internal error.");
                    return StatusCode(500, "Failed to update the album due to an internal error.");
                }

                _logger.LogInformation($"Album updated successfully: {album.Title}");
                return Ok(album);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "An exception occurred while updating the album.");
                return StatusCode(500, "Internal server error");
            }
        }


        [HttpDelete("delete-album-by-id/{id}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public async Task<IActionResult> DeleteAlbumAsync(int id)
        {
            try
            {
                var result = await _albumService.DeleteAlbumAsync(id);
                if (!result)
                {
                    _logger.LogError("Failed to delete the album due to an internal error.");
                    return StatusCode(500, "Failed to delete the album due to an internal error.");
                }

                _logger.LogInformation($"Album: {id} deleted successfully");
                return Ok("the album was deleted successfuly");
            }

            catch (Exception ex)
            {
                _logger.LogError(ex, "An exception occurred while delete the album.");
                return StatusCode(500, "Internal server error");
            }
        }




        [HttpGet("albums-by-user")]
        [ProducesResponseType(typeof(IEnumerable<Album>), StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<IActionResult> GetAlbumsByUserAsync()
        {
            try
            {
                // שליפת userId מתוך ה-Claims
                var userIdClaim = User.FindFirst(ClaimTypes.NameIdentifier) ?? User.FindFirst("sub") ?? User.FindFirst("userId");
                if (userIdClaim == null)
                {
                    _logger.LogWarning("User ID claim not found in token.");
                    return Unauthorized("User ID not found.");
                }

                var userId = int.Parse(userIdClaim.Value);

                var albums = await _albumService.GetAlbumsByUserIdAsync(userId);
                if (albums == null || !albums.Any())
                {
                    _logger.LogWarning($"No albums found for user {userId}.");
                    return NotFound($"No albums found for user {userId}.");
                }

                return Ok(albums);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "An error occurred while retrieving albums for user from token.");
                return StatusCode(500, "Internal server error");
            }
        }

        [HttpPost("create-album")]
        [Authorize]
        [ProducesResponseType(typeof(Album), StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        public async Task<IActionResult> CreateAlbumAsync([FromBody] Album album)
        {
            try
            {
                // שליפת userId מתוך ה-Claims
                var userIdClaim = User.FindFirst(ClaimTypes.NameIdentifier) ?? User.FindFirst("sub") ?? User.FindFirst("userId");
                if (userIdClaim == null)
                {
                    _logger.LogWarning("User ID claim not found in token.");
                    return Unauthorized("User ID not found.");
                }

                var userId = int.Parse(userIdClaim.Value);

                // יצירת האלבום עם ה-UserId שהתקבל מהטוקן
                var album2 = new Album
                {
                    Title = album.Title,
                    Description = album.Description,
                    CreatedAt = DateTime.UtcNow,
                    UserId = userId
                };

                var createdAlbum = await _albumService.AddAlbumAsync(album2);
                return Ok(createdAlbum);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "An error occurred while creating album.");
                return StatusCode(500, "Internal server error");
            }
        }



        [HttpGet("{albumId}/download-zip")]
        [ProducesResponseType(typeof(FileContentResult), StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<IActionResult> DownloadAlbumZip(int albumId)
        {
            try
            {
                var zipBytes = await _albumService.GetAlbumZipAsync(albumId);
                return File(zipBytes, "application/zip", $"album-{albumId}.zip");
            }
            catch (Exception ex)
            {
                return NotFound(ex.Message);
            }
        }
    }
}
