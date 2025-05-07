using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using PhotoAlbum.API.Dto;
using PhotoAlbum.Core.Dto;
using PhotoAlbum.Core.Entities;
using PhotoAlbum.Core.IServices;
using System.Security.Claims;

namespace PhotoAlbum.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Authorize]
    public class PictureController : Controller
    {
        private readonly IPictureService _pictureService;

        public PictureController(IPictureService pictureService)
        {
            _pictureService = pictureService;
        }

        [HttpPost]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(typeof(string), StatusCodes.Status400BadRequest)]
        [ProducesResponseType(typeof(string), StatusCodes.Status500InternalServerError)]
        public async Task<IActionResult> AddPicture([FromBody] PictureDto dto)
        {
            await _pictureService.AddPictureAsync(dto);
            return Ok("Picture added successfully.");
        }


        [HttpDelete("{id}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(typeof(string), StatusCodes.Status404NotFound)]
        [ProducesResponseType(typeof(string), StatusCodes.Status500InternalServerError)]
        public async Task<IActionResult> DeletePicture(int id)
        {
            var result = await _pictureService.DeletePictureAsync(id);
            if (!result)
                return NotFound($"Picture with id {id} not found.");

            return Ok($"Picture with id {id} deleted successfully.");
        }


        [HttpPost("{pictureId}/add-tag")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public async Task<IActionResult> AddTagToPicture(int pictureId, [FromBody] string tagName)
        {
            var result = await _pictureService.AddTagToPictureAsync(pictureId, tagName);
            if (!result)
                return NotFound($"Picture with ID {pictureId} not found.");

            return Ok($"Tag '{tagName}' added to picture {pictureId}.");
        }


        [HttpGet]
        [ProducesResponseType(typeof(IEnumerable<Picture>), StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        [Authorize(Policy = "AdminOnly")]
        public async Task<IActionResult> GetAllPictures()
        {
            try
            {
                var pictures = await _pictureService.GetAllPicturesAsync();
                return Ok(pictures);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }


        /// <summary>
        /// GET: /api/Picture/tag/{tagName}
        /// Returns all pictures that have the specified tag.
        /// </summary>
        [HttpGet("tag/{tagName}")]
        [ProducesResponseType(typeof(IEnumerable<Picture>), StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<IActionResult> GetPicturesByTag(string tagName)
        {
            var pictures = await _pictureService.GetPicturesByTagAsync(tagName);
            if (pictures == null || !pictures.Any())
            {
                return NotFound($"No pictures found with the tag: {tagName}");
            }
            return Ok(pictures);
        }


        [HttpGet("{id}")]
        [ProducesResponseType(typeof(PictureDto), StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<IActionResult> GetPictureById(int id)
        {
            var pictureDto = await _pictureService.GetPictureByIdAsync(id);
            if (pictureDto == null)
            {
                return NotFound();
            }
            return Ok(pictureDto);
        }

        [HttpPut("{id}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<IActionResult> UpdatePicture(int id, [FromBody] PictureDto updateDto)
        {
            var result = await _pictureService.UpdatePictureAsync(id, updateDto);
            if (result)
            {
                return Ok();
            }
            return NotFound();
        }

        [HttpDelete("{pictureId}/remove-tag")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<IActionResult> RemoveTagFromPicture(int pictureId, [FromQuery] string tagName)
        {
            var result = await _pictureService.RemoveTagFromPictureAsync(pictureId, tagName);
            if (!result)
                return NotFound($"Either picture with id {pictureId} or tag '{tagName}' was not found.");
            return Ok($"Tag '{tagName}' removed from picture {pictureId} successfully.");
        }

        [HttpGet("user/{userId}")]
        public async Task<IActionResult> GetPicturesByUserId(int userId)
        {
            var pictures = await _pictureService.GetPicturesByUserIdAsync(userId);
            return Ok(pictures);
        }

        [Authorize]
        [HttpGet("current-user")]
        [ProducesResponseType(typeof(IEnumerable<Picture>), StatusCodes.Status200OK)] // When pictures are successfully returned
        [ProducesResponseType(StatusCodes.Status401Unauthorized)] // When userId is missing or invalid
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        [Produces("application/json")]
        public async Task<IActionResult> GetPicturesForCurrentUser()
        {
            var userIdClaim = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;

            if (userIdClaim == null || !int.TryParse(userIdClaim, out int userId))
                return Unauthorized("Invalid or missing userId in token.");

            var pictures = await _pictureService.GetPicturesByUserIdAsync(userId);
            return Ok(pictures);
        }


        [Authorize]
        [HttpGet("current-user/pictures-by-tag/{tagId}")]
        [ProducesResponseType(typeof(IEnumerable<PictureDto>), StatusCodes.Status200OK)] // הצלחה
        [ProducesResponseType(typeof(string), StatusCodes.Status401Unauthorized)] // כשאין userId בטוקן
        [ProducesResponseType(typeof(string), StatusCodes.Status404NotFound)] // כשלא נמצאו תמונות עם התגית
        [ProducesResponseType(StatusCodes.Status500InternalServerError)] // שגיאות כלליות
        [Produces("application/json")]
        public async Task<IActionResult> GetPicturesForCurrentUserByTag(int tagId)
        {
            var userIdClaim = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;

            if (userIdClaim == null || !int.TryParse(userIdClaim, out int userId))
                return Unauthorized("Invalid or missing userId in token.");

            var pictures = await _pictureService.GetPicturesByTagAndUserIdAsync(tagId, userId);

            if (pictures == null || !pictures.Any())
                return NotFound("No pictures found for this tag.");

            return Ok(pictures);
        }
    }
}
