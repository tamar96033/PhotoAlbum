using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using PhotoAlbum.API.Dto;
using PhotoAlbum.Core.Dto;
using PhotoAlbum.Core.Entities;
using PhotoAlbum.Core.IServices;

namespace PhotoAlbum.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class PictureController : Controller
    {
        private readonly IPictureService _pictureService;

        public PictureController(IPictureService pictureService)
        {
            _pictureService = pictureService;
        }

        [HttpPost]
        public async Task<IActionResult> AddPicture([FromBody] AddPictureDto dto)
        {
            await _pictureService.AddPictureAsync(dto.Name, dto.Tags);
            return Ok("Picture added successfully.");
        }


        [HttpDelete("{id}")]
        public async Task<IActionResult> DeletePicture(int id)
        {
            var result = await _pictureService.DeletePictureAsync(id);
            if (!result)
                return NotFound($"Picture with id {id} not found.");

            return Ok($"Picture with id {id} deleted successfully.");
        }


        [HttpPost("{pictureId}/add-tag")]
        public async Task<IActionResult> AddTagToPicture(int pictureId, [FromBody] string tagName)
        {
            var result = await _pictureService.AddTagToPictureAsync(pictureId, tagName);
            if (!result)
                return NotFound($"Picture with ID {pictureId} not found.");

            return Ok($"Tag '{tagName}' added to picture {pictureId}.");
        }


        [HttpGet]
        [ProducesResponseType(typeof(IEnumerable<Picture>), 200)]
        public async Task<IActionResult> GetAllPictures()
        {
            var pictures = await _pictureService.GetAllPicturesAsync();
            return Ok(pictures);
        }


        /// <summary>
        /// GET: /api/Picture/tag/{tagName}
        /// Returns all pictures that have the specified tag.
        /// </summary>
        [HttpGet("tag/{tagName}")]
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
        public async Task<IActionResult> RemoveTagFromPicture(int pictureId, [FromQuery] string tagName)
        {
            var result = await _pictureService.RemoveTagFromPictureAsync(pictureId, tagName);
            if (!result)
                return NotFound($"Either picture with id {pictureId} or tag '{tagName}' was not found.");
            return Ok($"Tag '{tagName}' removed from picture {pictureId} successfully.");
        }
    }
}
