using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Practise.Data;

namespace Practise.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class GetAllSchedulesController : ControllerBase
    {
        public readonly AppDbContext _context;

        public GetAllSchedulesController(AppDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public IActionResult Get()
        {
            var schedules = _context.schedules.ToList();

            return Ok(new { schedules });
        }
    }
}
