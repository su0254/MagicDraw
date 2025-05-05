using AutoMapper;
using Children_s_drawing.Core.InterfacesServices;
using Childrens_drawing.Core.Dtos;
using Childrens_drawing.Core.PostModels;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;
using System.Threading.Tasks;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace Children_s_drawing.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly IUserService _userService;
        private readonly IMapper _mapper;
        public UserController(IUserService userService, IMapper mapper)
        {
            _userService = userService;
            _mapper = mapper;
        }

        // GET: api/<CategoryController>
        [HttpGet]
        //[Authorize(Roles = "Admin")]
        public async Task<ActionResult<IEnumerable<UserDto>>> Get()
        {
            var users = await _userService.GetAllAsync();
            if (users == null)
                return NotFound();
            return Ok(users);
        }

        // GET api/<CategoryController>/5
        [HttpGet("{id}")]
        //[Authorize(Roles= "EditorOrAdmin")]
        public async Task<ActionResult<UserDto>> Get(Guid id)
        {
            //var currentUserId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            //if (id.ToString() != currentUserId && !User.IsInRole("Admin"))
            //    return Forbid();

            var u = await _userService.GetByIdAsync(id);
            if (u == null)
                return NotFound();
            return Ok(u);

        }

        // POST api/<CategoryController>
        [HttpPost]
        //[Authorize(Roles = "Admin")]
        public async Task<ActionResult<UserDto>> Post([FromBody] UserPostModel user)
        {
            var userDto = _mapper.Map<UserDto>(user);
            userDto = await _userService.AddAsync(userDto);
            if (userDto == null)
                return NotFound();
            return userDto;
        }

        // PUT api/<CategoryController>/5
        [HttpPut("{id}")]
        //[Authorize(Roles = "EditorOrAdmin")]
        public async Task<ActionResult<UserDto>> Put(Guid id, [FromBody] UserPostModel user)
        {
            //var currentUserId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            //if (id.ToString() != currentUserId && !User.IsInRole("Admin"))
            //    return Forbid();

            var userDto = _mapper.Map<UserDto>(user);
            userDto = await _userService.UpdateByIdAsync(id, userDto);
            if (userDto == null)
                return NotFound();
            return userDto;
        }

        // DELETE api/<CategoryController>/5
        [HttpDelete("{id}")]
        //[Authorize(Roles = "Admin")]
        public async Task<bool> Delete(Guid id)
        {
            return await _userService.DeleteByIdAsync(id);
        }
    }
}
