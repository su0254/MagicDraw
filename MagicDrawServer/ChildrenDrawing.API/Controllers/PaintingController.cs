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
    public class PaintingController : ControllerBase
    {
        private readonly IPaintingService _paintingService;
        private readonly IMapper _mapper;
        public PaintingController(IPaintingService paintingService, IMapper mapper)
        {
            _paintingService = paintingService;
            _mapper = mapper;
        }

        // GET: api/<CategoryController>
        [HttpGet]
        public async Task<ActionResult<IEnumerable<PaintingDto>>> Get()
        {
            var paintings = await _paintingService.GetAllAsync();
            if (paintings == null)
                return NotFound();
            return Ok(paintings);
        }

        // GET api/<CategoryController>/5
        [HttpGet("{id}")]
        [Authorize(Policy = "EditorOrAdmin")]
        public async Task<ActionResult<PaintingDto>> Get(Guid id)
        {
            var p = await _paintingService.GetByIdAsync(id);
            if (p == null)
                return NotFound();
            return Ok(p);

        }

        // POST api/<CategoryController>
        [HttpPost]
        //[Authorize(Roles = "EditorOrAdmin")]
        [Authorize(Policy = "EditorOrAdmin")]
        public async Task<ActionResult<PaintingDto>> Post([FromForm] PaintingPostModel painting)
        {
            var paintingDto = _mapper.Map<PaintingDto>(painting);
            paintingDto = await _paintingService.AddAsync(paintingDto, painting.ImageFile);
            if (paintingDto == null)
                return NotFound();
            return paintingDto;
        }

        // PUT api/<CategoryController>/5
        [HttpPut("{id}")]
        [Authorize(Policy = "EditorOrAdmin")]
        public async Task<ActionResult<PaintingDto>> Put(Guid id, [FromBody] PaintingPostModel painting)
        {
            var currentUserId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            if (painting.UserId.ToString() != currentUserId && !User.IsInRole("Admin"))
                return Forbid();
            var paintingDto = _mapper.Map<PaintingDto>(painting);
            paintingDto = await _paintingService.UpdateByIdAsync(id, paintingDto);
            if (paintingDto == null)
                return NotFound();
            return paintingDto;
        }

        // DELETE api/<CategoryController>/5
        [HttpDelete("{id}")]
        [Authorize(Roles = "Admin")]
        public async Task<bool> Delete(Guid id)
        {
            return await _paintingService.DeleteByIdAsync(id);
        }

        [HttpGet("GetByCategory/{categoryName}")]
        [Authorize(Policy = "EditorOrAdmin")]
        public async Task<ActionResult<IEnumerable<PaintingDto>>> GetByCategory(string categoryName)
        {
            var paintings = await _paintingService.GetPaintingsByCategoryAsync(categoryName);
            if (paintings == null)
                return NotFound();
            return Ok(paintings);
        }
    }
}
