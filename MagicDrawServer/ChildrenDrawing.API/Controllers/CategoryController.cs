using AutoMapper;
using Children_s_drawing.Core.InterfacesServices;
using Childrens_drawing.Core.Dtos;
using Childrens_drawing.Core.PostModels;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Runtime.CompilerServices;
using System.Security.Claims;
using System.Threading.Tasks;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace Children_s_drawing.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CategoryController : ControllerBase
    {

        private readonly ICategoryService _categoryService;
        private readonly IMapper _mapper;
        public CategoryController(ICategoryService categoryService, IMapper mapper)
        {
            _categoryService = categoryService;
            _mapper = mapper;
        }

        // GET: api/<CategoryController>
        [HttpGet]
        public async Task<ActionResult<IEnumerable<CategoryDto>>> Get()
        {
            var categorys = await _categoryService.GetAllAsync();
            if (categorys == null)
                return NotFound();
            return Ok(categorys);
        }

        // GET api/<CategoryController>/5
        [HttpGet("{id}")]
        [Authorize(Policy = "EditorOrAdmin")]
        public async Task<ActionResult<CategoryDto>> Get(Guid id)
        {
            var c = await _categoryService.GetByIdAsync(id);
            if (c == null)
                return NotFound();
            return c;

        }

        // POST api/<CategoryController>
        [HttpPost]
        [Authorize(Roles = "Admin")]
        public async Task<ActionResult<CategoryDto>> Post([FromBody] CategoryPostModel category)
        {
            var categoryDto = _mapper.Map<CategoryDto>(category);
            categoryDto = await _categoryService.AddAsync(categoryDto);
            if (categoryDto == null)
                return NotFound();
            return categoryDto;
        }

        // PUT api/<CategoryController>/5
        [HttpPut("{id}")]
        [Authorize(Roles = "Admin")]
        public async Task<ActionResult<CategoryDto>> Put(Guid id, [FromBody] CategoryPostModel category)
        {
            var categoryDto = _mapper.Map<CategoryDto>(category);
            categoryDto = await _categoryService.UpdateByIdAsync(id, categoryDto);
            if (categoryDto == null)
                return NotFound();
            return categoryDto;
        }

        // DELETE api/<CategoryController>/5
        [HttpDelete("{id}")]
        [Authorize(Roles = "Admin")]
        public async Task<bool> Delete(Guid id)
        {
            return await _categoryService.DeleteByIdAsync(id);
        }
    }
}
