using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Practise.Data;

namespace Practise.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class GetSeatsController : ControllerBase
    {
        public readonly AppDbContext _context;

        public GetSeatsController(AppDbContext context)
        {
            _context = context;
        }

        [HttpPost]
        public IActionResult GetSeats([FromQuery] int schedule_id)
        { 
            var reserved = _context.reservationsDetail.Include(s => s.reservations)
                .Where(s => s.reservations.schedule_id == schedule_id).ToList();

            return Ok(new {success = true , reservedSeats = reserved});
        }

    }
}
