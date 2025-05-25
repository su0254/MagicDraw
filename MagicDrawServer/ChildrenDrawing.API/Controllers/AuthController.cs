using AutoMapper;
using Children_s_drawing.Core.Entities;
using Childrens_drawing.API.PostModels;
using Childrens_drawing.Core.Dtos;
using Childrens_drawing.Core.InterfacesServices;
using Childrens_drawing.Core.PostModels;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace Childrens_drawing.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly IConfiguration _configuration;
        private readonly IAuthService _authService;
        private readonly IMapper _mapper;

        public AuthController(IConfiguration configuration, IAuthService authService, IMapper mapper)
        {
            _configuration = configuration;
            _authService = authService;
            _mapper = mapper;
        }

        [HttpPost("login")]
        public async Task<ActionResult<LoginResDto>> LoginAsync([FromBody] LoginPostModel loginPostModel)
        {
            if (string.IsNullOrWhiteSpace(loginPostModel.Email) && string.IsNullOrWhiteSpace(loginPostModel.Password))
                return BadRequest("Email and password are required");
            var user = await _authService.LoginAsync(loginPostModel.Email, loginPostModel.Password);
            if (user == null)
                return Unauthorized();

            return Ok(user);
        }

        [HttpPost("register")]
        public async Task<ActionResult<LoginResDto>> RegisterAsync([FromBody] UserPostModel userPostModel)
        {
            if (string.IsNullOrWhiteSpace(userPostModel.Email) && string.IsNullOrWhiteSpace(userPostModel.Password))
                return BadRequest("Email and password are required");
            var userDto = _mapper.Map<UserDto>(userPostModel);
            var loginResDto = await _authService.RegisterAsync(userDto);
            if (loginResDto == null)
                return BadRequest("User already exists");
            return Ok(loginResDto);
        }
    }
}
