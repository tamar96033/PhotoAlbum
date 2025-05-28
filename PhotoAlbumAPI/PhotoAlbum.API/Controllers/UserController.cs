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
        [ProducesResponseType(typeof(List<UserDto>), 200)]
        [Authorize(Policy = "AdminOnly")]
        public async Task<IActionResult> GetAllUsers()
        {
            return Ok(await _userService.GetAllUsersAsync());
        }


        [HttpGet("users-with-pictures")]
        [Authorize]
        // [Authorize(Policy = "AdminOnly")]
        [ProducesResponseType(typeof(List<UserWithPictureDto>), StatusCodes.Status200OK)]
        public async Task<IActionResult> GetUsersWithPictures()
        {
            var result = await _userService.GetAllUsersWithPicturesAsync();
            return Ok(result);
        }

        [HttpGet("get-user-by-token")]
        [Authorize]
        [ProducesResponseType(typeof(User), StatusCodes.Status200OK)]
        [ProducesResponseType(typeof(object), StatusCodes.Status400BadRequest)]
        public IActionResult GetUserFromToken()
        {
            // קורא את ה-Authorization header
            var authHeader = HttpContext.Request.Headers["Authorization"].FirstOrDefault();

            if (string.IsNullOrEmpty(authHeader))
                return Unauthorized();

            var user = _userService.GetUserFromToken(authHeader);

            if (user == null)
                return NotFound();

            return Ok(user);
        }
    }
}
