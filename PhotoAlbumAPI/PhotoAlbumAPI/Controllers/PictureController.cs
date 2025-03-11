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


    }
}
