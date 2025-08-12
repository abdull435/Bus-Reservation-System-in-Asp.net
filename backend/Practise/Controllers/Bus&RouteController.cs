using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Authorization;

using Microsoft.AspNetCore.Mvc;
using Practise.Data;

namespace Practise.Controllers
{
    [Authorize(Roles ="Admin")]
    [Route("[controller]")]
    [ApiController]
    public class Bus_RouteController : ControllerBase
    {
        public readonly AppDbContext _context;

        public Bus_RouteController(AppDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public IActionResult Get()
        {
            var bus = _context.bus.ToList();
            var route = _context.route.ToList();

            return Ok(new{bus,route});
        }
    }
}
