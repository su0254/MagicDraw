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
        public ActionResult<PaintingDto> Get(Guid id)
        {
            var p = _paintingService.GetById(id);
            if (p == null)
                return NotFound();
            return Ok(p);

        }

        // POST api/<CategoryController>
        [HttpPost]
        public ActionResult<PaintingDto> Post([FromBody] PaintingPostModel painting)
        {
            var paintingDto = _mapper.Map<PaintingDto>(painting);
            paintingDto = _paintingService.Add(paintingDto);
            if (paintingDto == null)
                return NotFound();
            return paintingDto;
        }

        // PUT api/<CategoryController>/5
        [HttpPut("{id}")]
        public ActionResult<PaintingDto> Put(Guid id, [FromBody] PaintingPostModel painting)
        {
            var paintingDto = _mapper.Map<PaintingDto>(painting);
            paintingDto = _paintingService.UpdateById(id, paintingDto);
            if (paintingDto == null)
                return NotFound();
            return paintingDto;
        }

        // DELETE api/<CategoryController>/5
        [HttpDelete("{id}")]
        public void Delete(Guid id)
        {
            _paintingService.DeleteById(id);
        }
    }
}
