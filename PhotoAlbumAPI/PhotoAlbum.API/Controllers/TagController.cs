using AutoMapper;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using PhotoAlbum.Core.Dto;
using PhotoAlbum.Core.Entities;
using PhotoAlbum.Core.IServices;

namespace PhotoAlbum.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class TagController : ControllerBase
    {
        private readonly ITagService _tagService;
        private readonly IMapper _mapper;

        public TagController(ITagService tagService, IMapper mapper)
        {
            _tagService = tagService;
            _mapper = mapper;
        }

        [HttpGet]
        [ProducesResponseType(typeof(IEnumerable<string>), StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<IActionResult> GetAllTags()
        {
            var tags = await _tagService.GetAllTagsAsync();
            return Ok(tags);
        }

        [HttpGet("{id}")]
        [ProducesResponseType(typeof(Tag), StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<IActionResult> GetTagById(int id)
        {
            var tag = await _tagService.GetTagByIdAsync(id);
            if (tag == null)
                return NotFound();

            return Ok(tag);
        }

        [HttpPost]
        [ProducesResponseType(typeof(Tag), StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<IActionResult> CreateTag([FromBody] TagDto tagDto)
        {
            if (tagDto == null)
                return BadRequest("Invalid tag data.");

            var tag = _mapper.Map<Tag>(tagDto);
            var result = await _tagService.CreateTagAsync(tag);

            if (result)
                return CreatedAtAction(nameof(GetTagById), new { id = tag.Id }, tag);

            return BadRequest("Error creating tag.");
        }

        /// <summary>
        /// PUT: /api/Tag/{id}
        /// Updates an existing tag.
        /// </summary>
        /// <param name="id">The ID of the tag to be updated.</param>
        /// <param name="name">The new name for the tag.</param>
        /// <returns>Status code 204 No Content if the update was successful, or 404 Not Found if the tag does not exist.</returns>
        [HttpPut("{id}")]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<IActionResult> UpdateTag(int id, string name)
        {
            var success = await _tagService.UpdateTagAsync(id, name);
            if (!success)
                return NotFound();

            return NoContent();
        }

        /// <summary>
        /// DELETE: /api/Tag/{id}
        /// Deletes the tag with the specified ID.
        /// </summary>
        /// <param name="id">The ID of the tag to be deleted.</param>
        /// <returns>Status code 204 No Content if the deletion was successful, or 404 Not Found if the tag does not exist.</returns>
        [HttpDelete("{id}")]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<IActionResult> DeleteTag(int id)
        {
            var success = await _tagService.DeleteTagAsync(id);
            if (!success)
                return NotFound();

            return NoContent();
        }
    }
}
