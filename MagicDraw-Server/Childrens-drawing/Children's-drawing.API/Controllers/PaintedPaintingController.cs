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
        public ActionResult<PaintedPaintingDto> Get(Guid id)
        {
            var p = _paintedPaintingService.GetById(id);
            if (p == null)
                return NotFound();
            return Ok(p);

        }

        // POST api/<CategoryController>
        [HttpPost]
        public ActionResult<PaintedPaintingDto> Post([FromBody] PaintedPaintingPostModel paintedPainting)
        {
            var paintedPaintingDto = _mapper.Map<PaintedPaintingDto>(paintedPainting);
            paintedPaintingDto = _paintedPaintingService.Add(paintedPaintingDto);
            if (paintedPaintingDto == null)
                return NotFound();
            return paintedPaintingDto;
        }

        // PUT api/<CategoryController>/5
        [HttpPut("{id}")]
        public ActionResult<PaintedPaintingDto> Put(Guid id, [FromBody] PaintedPaintingPostModel paintedPainting)
        {
            var paintedPaintingDto = _mapper.Map<PaintedPaintingDto>(paintedPainting);
            paintedPaintingDto = _paintedPaintingService.UpdateById(id, paintedPaintingDto);
            if (paintedPaintingDto == null)
                return NotFound();
            return paintedPaintingDto;
        }

        // DELETE api/<CategoryController>/5
        [HttpDelete("{id}")]
        public void Delete(Guid id)
        {
            _paintedPaintingService.DeleteById(id);
        }
    }
}
