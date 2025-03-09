using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using PhotoAlbum.Core.IServices;

namespace PhotoAlbum.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AlbumController : Controller
    {
        private readonly IAlbumService _albumService;
         
        public AlbumController(IAlbumService albumService)
        {
            _albumService = albumService;
        }

        //getting the functions from the service
        [HttpGet]
        public async Task<ActionResult> GetAlbumsAsync()
        {
            var album = await _albumService.GetAlbumsAsync();

            return Ok(album);
        }

        

    }
}
