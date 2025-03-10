using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using PhotoAlbum.Core.Entities;
using PhotoAlbum.Data;

namespace PhotoAlbum.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class PictureController : Controller
    {
        private readonly DataContext _context;

        public PictureController(DataContext context)
        {
            _context = context;
        }



        [HttpPost]
        public async Task<ActionResult<Picture>> CreatePicture(Picture picture)
        {
            if (picture == null)
            {
                return BadRequest("Invalid data.");
            }

            // Ensure the PictureTags are initialized
            if (picture.PictureTags == null)
            {
                picture.PictureTags = new List<PictureTag>();
            }

            // Add the Picture to the context
            _context.Pictures.Add(picture);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(CreatePicture), new { id = picture.Id }, picture);
        }
    }
}
