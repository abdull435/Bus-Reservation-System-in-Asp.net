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
            DateTime utcTime = DateTime.UtcNow;

            TimeZoneInfo pakistanTimeZone = TimeZoneInfo.FindSystemTimeZoneById("Pakistan Standard Time");
            DateTime pakistanTime = TimeZoneInfo.ConvertTimeFromUtc(utcTime, pakistanTimeZone);
            DateTime todayDate = pakistanTime.Date;
            var schedules = _context.schedules
        .Include(s => s.routes).Include(s => s.bus)
        .Where(s => s.date.Date == request.date &&
                    s.routes.from_city == request.from_city &&
                    s.routes.to_city == request.to_city && s.departure_time >=todayDate)
        .ToList();

            return Ok(new { success = true, schedules });

        }

    }
}
