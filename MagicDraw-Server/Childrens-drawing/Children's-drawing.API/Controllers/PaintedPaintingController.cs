using Microsoft.AspNetCore.Mvc;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace Children_s_drawing.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PaintedPaintingController : ControllerBase
    {
        // GET: api/<PaintedPaintingController>
        [HttpGet]
        public IEnumerable<string> Get()
        {
            return new string[] { "value1", "value2" };
        }

        // GET api/<PaintedPaintingController>/5
        [HttpGet("{id}")]
        public string Get(int id)
        {
            return "value";
        }

        // POST api/<PaintedPaintingController>
        [HttpPost]
        public void Post([FromBody] string value)
        {
        }

        // PUT api/<PaintedPaintingController>/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] string value)
        {
        }

        // DELETE api/<PaintedPaintingController>/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}
