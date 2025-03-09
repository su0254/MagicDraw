using AutoMapper;
using Children_s_drawing.Core.InterfacesServices;
using Childrens_drawing.Core.Dtos;
using Childrens_drawing.Core.PostModels;
using Microsoft.AspNetCore.Mvc;
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
        public async Task<ActionResult<IEnumerable<UserDto>>> Get()
        {
            var users = await _userService.GetAllAsync();
            if (users == null)
                return NotFound();
            return Ok(users);
        }

        // GET api/<CategoryController>/5
        [HttpGet("{id}")]
        public ActionResult<UserDto> Get(int id)
        {
            var u = _userService.GetById(id);
            if (u == null)
                return NotFound();
            return Ok(u);

        }

        // POST api/<CategoryController>
        [HttpPost]
        public ActionResult<UserDto> Post([FromBody] UserPostModel user)
        {
            var userDto = _mapper.Map<UserDto>(user);
            userDto = _userService.Add(userDto);
            if (userDto == null)
                return NotFound();
            return userDto;
        }

        // PUT api/<CategoryController>/5
        [HttpPut("{id}")]
        public ActionResult<UserDto> Put(int id, [FromBody] UserPostModel user)
        {
            var userDto = _mapper.Map<UserDto>(user);
            userDto = _userService.UpdateById(id, userDto);
            if (userDto == null)
                return NotFound();
            return userDto;
        }

        // DELETE api/<CategoryController>/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
            _userService.DeleteById(id);
        }
    }
}
