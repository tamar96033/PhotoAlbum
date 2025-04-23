using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using PhotoAlbum.API.Dto;
using PhotoAlbum.Core.Entities;
using PhotoAlbum.Core.IServices;
using PhotoAlbum.Service.Dto;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace PhotoAlbum.API.Controllers
{

    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : Controller
    {
        private readonly IConfiguration _configuration;
        private readonly IAuthService _authService;

        public AuthController(IConfiguration configuration, IAuthService authService)
        {
            _configuration = configuration;
            _authService = authService;
        }

        [HttpPost("login")]
        [AllowAnonymous]
        [ProducesResponseType(typeof(object), StatusCodes.Status200OK)]
        [ProducesResponseType(typeof(object), StatusCodes.Status401Unauthorized)]
        public async Task<IActionResult> Login([FromBody] LoginUserDto user)
        {
            // Validate the user and generate the token
            var token = await _authService.GenerateJwtTokenAsync(user.Name, user.Password);

            if (token == null || token.Count() == 0)
            {
                return Unauthorized(new { message = "Invalid username or password" });
            }

            return Ok(new { Token = token });
        }


        [HttpPost("register")]
        [AllowAnonymous]
        [ProducesResponseType(typeof(object), StatusCodes.Status200OK)]
        public async Task<IActionResult> RegisterUser([FromBody] RegisterUserDto dto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var result = await _authService.RegisterUserWithRoleAsync(dto);
            if (!result)
            {
                return BadRequest("User registration failed. Possibly the user already exists or the role was not found.");
            }
            var token = await _authService.GenerateJwtTokenAsync(dto.Name ?? "", dto.Password ?? "");

            return Ok(new { Token = token });
        }
    }
}

