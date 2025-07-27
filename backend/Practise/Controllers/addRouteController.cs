using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Practise.Data;
using Practise.DTO;
using Practise.Models;

namespace Practise.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class addRouteController : ControllerBase
    {
        public readonly AppDbContext _context;

        public addRouteController(AppDbContext context)
        {
            _context = context;
        }

        [HttpPost]
        public IActionResult addRoute([FromBody] addRouteDTO model)
        {
            var route = new Routes
            {
                from_city = model.from_city,
                to_city = model.to_city,
            };
            _context.route.Add(route);
            _context.SaveChanges();

            return Ok(new {success  = true});
        }
    }
}
