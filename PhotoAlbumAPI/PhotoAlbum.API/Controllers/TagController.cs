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
        public async Task<IActionResult> GetAllTags()
        {
            var tags = await _tagService.GetAllTagsAsync();
            return Ok(tags);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetTagById(int id)
        {
            var tag = await _tagService.GetTagByIdAsync(id);
            if (tag == null)
                return NotFound();

            return Ok(tag);
        }

        [HttpPost]
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

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateTag(int id, string name)
        {
            var success = await _tagService.UpdateTagAsync(id, name);
            if (!success)
                return NotFound();

            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteTag(int id)
        {
            var success = await _tagService.DeleteTagAsync(id);
            if (!success)
                return NotFound();

            return NoContent();
        }
    }
}
