using Amazon.Auth.AccessControlPolicy;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using PhotoAlbum.Core.Dto;
using PhotoAlbum.Core.Entities;
using PhotoAlbum.Core.IServices;

namespace PhotoAlbum.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class UserController : Controller
    {
        private IUserService _userService;

        public UserController(IUserService userService)
        {
            _userService = userService;
        }

        [HttpGet("all-users")]
        [ProducesResponseType(typeof(List<User>), 200)]
        [Authorize(Policy = "AdminOnly")]
        public async Task<IActionResult> GetAllUsers()
        {
            return Ok(await _userService.GetAllUsersAsync());
        }

        [HttpGet("users-with-pictures")]
        [Authorize]
        [ProducesResponseType(typeof(List<UserWithPictureDto>), StatusCodes.Status200OK)]
        public async Task<IActionResult> GetUsersWithPictures()
        {
            var result = await _userService.GetAllUsersWithPicturesAsync();
            return Ok(result);
        }
    }
}
