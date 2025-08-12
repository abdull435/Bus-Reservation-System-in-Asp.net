using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Practise.Data;
using Practise.DTO;
using Practise.Models;

namespace Practise.Controllers
{
    [Authorize(Roles = "Admin")]
    [Route("[controller]")]
    [ApiController]
    public class RouteController : ControllerBase
    {
        public readonly AppDbContext _context;

        public RouteController(AppDbContext context)
        {
            _context = context;
        }

        [HttpPost("add-route")]
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

        [HttpPut("update-route/{id}")]

        public async Task<IActionResult> updateRoute(int id , [FromBody] addRouteDTO model)
        {
            var route = await _context.route.FindAsync(id);
            if (route == null)
            {
                return BadRequest(new {message = "Route id not found" });
            }

            bool checkRoute = _context.route.Any(r => r.from_city == model.from_city && r.to_city == model.to_city);


            if (checkRoute)
            {
                return Ok(new { success = true,message = "Route already exist." });
            }

            route.from_city = model.from_city;
                route.to_city = model.to_city;

                await _context.SaveChangesAsync();

            return Ok(new {success = true, message = "Route Updated succesfully." });
        }
    }
}
