using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Org.BouncyCastle.Asn1.Ocsp;
using Practise.Data;
using Practise.DTO;

namespace Practise.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class GetSchedulesController : ControllerBase
    {
        public readonly AppDbContext _context;

        public GetSchedulesController(AppDbContext context)
        {
            _context = context;
        }

        [HttpPost]
        public IActionResult GetSchedule([FromBody] Search request)
        {
            var schedules = _context.schedules
        .Include(s => s.routes).Include(s => s.bus)
        .Where(s => s.date.Date == request.date &&
                    s.routes.from_city == request.from_city &&
                    s.routes.to_city == request.to_city)
        .ToList();

            return Ok(new { success = true, schedules });

        }

    }
}
