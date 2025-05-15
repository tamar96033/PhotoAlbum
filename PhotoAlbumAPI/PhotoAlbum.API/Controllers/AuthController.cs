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


        //[HttpPost("register")]
        //[AllowAnonymous]
        //[ProducesResponseType(typeof(object), StatusCodes.Status200OK)]
        //public async Task<IActionResult> RegisterUser([FromBody] RegisterUserDto dto)
        //{
        //    if (!ModelState.IsValid)
        //    {
        //        return BadRequest(ModelState);
        //    }

        //    var result = await _authService.RegisterUserWithRoleAsync(dto);
        //    if (!result)
        //    {
        //        return BadRequest("User registration failed. Possibly the user already exists or the role was not found.");
        //    }
        //    var token = await _authService.GenerateJwtTokenAsync(dto.Name ?? "", dto.Password ?? "");

        //    return Ok(new { Token = token });
        //}
        [HttpPost("register")]
        [AllowAnonymous]
        [ProducesResponseType(typeof(object), StatusCodes.Status200OK)]
        [ProducesResponseType(typeof(object), StatusCodes.Status400BadRequest)]
        public async Task<IActionResult> RegisterUser([FromBody] RegisterUserDto dto)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            dto.RoleName = "User"; // Force "User" role

            var result = await _authService.RegisterUserWithRoleAsync(dto);
            if (!result)
                return BadRequest("User registration failed.");

            var token = await _authService.GenerateJwtTokenAsync(dto.Name ?? "", dto.Password ?? "");
            return Ok(new { Token = token });
        }

        [HttpPost("register-admin")]
        [Authorize]
        [Consumes("application/json")]
        [ProducesResponseType(typeof(string), StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(string))]
        [ProducesResponseType(StatusCodes.Status400BadRequest, Type = typeof(ValidationProblemDetails))]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        public async Task<IActionResult> RegisterAdmin([FromBody]RegisterAdminDto dto)
        {
            var handler = new JwtSecurityTokenHandler();
            if (string.IsNullOrEmpty(dto.RegisterManagerToken) || !handler.CanReadToken(dto.RegisterManagerToken))
            {
                return Unauthorized("Invalid or missing token.");
            }

            // Optionally: validate token (if not already handled by [Authorize])
            try
            {
                var validatedToken = handler.ReadJwtToken(dto.RegisterManagerToken);
                // You can access claims here if needed:
                var roleClaim = validatedToken.Claims.FirstOrDefault(c => c.Type == "role");
                if (roleClaim?.Value != "Admin")
                {
                    return Unauthorized("Token does not belong to an admin.");
                }
            }
            catch (Exception)
            {
                return Unauthorized("Failed to validate token.");
            }
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            if (dto.RoleName != "Admin")
                return BadRequest("Only 'Admin' role is allowed here.");

            var newDto = new RegisterUserDto
            {
                Name = dto.Name,
                Email = dto.Email,
                Password = dto.Password,
                RoleName = "Admin"
            };

            var result = await _authService.RegisterUserWithRoleAsync(newDto);
            if (!result)
                return BadRequest("Admin registration failed.");

            return Ok("Admin registered successfully.");
        }
    }
}

