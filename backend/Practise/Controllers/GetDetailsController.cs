using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Practise.Data;
using Practise.Models;

namespace Practise.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class GetDetailsController : ControllerBase
    {
        public readonly AppDbContext _context;

        public GetDetailsController(AppDbContext context)
        {
            _context = context;
        }

        [HttpGet("/get-cities")]
        public IActionResult GetDetails()
        {
            var fromCities = _context.route
                .Where(r => r.from_city != null)
                .Select(r => r.from_city);

            var toCities = _context.route
                .Where(r => r.to_city != null)
                .Select(r => r.to_city);

            // Combine and remove duplicates
            var allCities = fromCities
                .Concat(toCities)
                .Distinct()
                .ToList();


            return Ok(new { success = true, routes = allCities});
        }
    }
}