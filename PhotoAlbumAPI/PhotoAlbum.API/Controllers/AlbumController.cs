using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using PhotoAlbum.Core.Entities;
using PhotoAlbum.Core.IServices;

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
        
        [HttpGet("id")]
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


        [HttpDelete("id")]
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
                return Ok();
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "An exception occurred while delete the album.");
                return StatusCode(500, "Internal server error");
            }
        }

    }
}
