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
    public class PaintedPaintingController : ControllerBase
    {
        private readonly IPaintedPaintingService _paintedPaintingService;
        private readonly IMapper _mapper;
        public PaintedPaintingController(IPaintedPaintingService paintedPaintingService, IMapper mapper)
        {
            _paintedPaintingService = paintedPaintingService;
            _mapper = mapper;
        }

        // GET: api/<CategoryController>
        [HttpGet]
        public async Task<ActionResult<IEnumerable<PaintedPaintingDto>>> Get()
        {
            var paintedPaintings = await _paintedPaintingService.GetAllAsync();
            if (paintedPaintings == null)
                return NotFound();
            return Ok(paintedPaintings);
        }

        // GET api/<CategoryController>/5
        [HttpGet("{id}")]
        public async Task<ActionResult<PaintedPaintingDto>> Get(Guid id)
        {
            var p = await _paintedPaintingService.GetByIdAsync(id);
            if (p == null)
                return NotFound();
            return Ok(p);

        }

        // POST api/<CategoryController>
        [HttpPost]
        public async Task<ActionResult<PaintedPaintingDto>> Post([FromBody] PaintedPaintingPostModel paintedPainting)
        {
            var paintedPaintingDto = _mapper.Map<PaintedPaintingDto>(paintedPainting);
            paintedPaintingDto = await _paintedPaintingService.AddAsync(paintedPaintingDto);
            if (paintedPaintingDto == null)
                return NotFound();
            return paintedPaintingDto;
        }

        // PUT api/<CategoryController>/5
        [HttpPut("{id}")]
        public async Task<ActionResult<PaintedPaintingDto>> Put(Guid id, [FromBody] PaintedPaintingPostModel paintedPainting)
        {
            var paintedPaintingDto = _mapper.Map<PaintedPaintingDto>(paintedPainting);
            paintedPaintingDto = await _paintedPaintingService.UpdateByIdAsync(id, paintedPaintingDto);
            if (paintedPaintingDto == null)
                return NotFound();
            return paintedPaintingDto;
        }

        // DELETE api/<CategoryController>/5
        [HttpDelete("{id}")]
        public async Task<bool> Delete(Guid id)
        {
            return await _paintedPaintingService.DeleteByIdAsync(id);
        }
    }
}
