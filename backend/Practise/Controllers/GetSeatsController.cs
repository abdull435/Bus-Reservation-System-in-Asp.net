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
            var email = HttpContext.Session.GetString("email");
            var user_id = HttpContext.Session.GetInt32("user_id");
            var name = HttpContext.Session.GetString("name");
            var mobile = HttpContext.Session.GetInt32("mobile");
            var cinic = HttpContext.Session.GetInt32("cinic");

            return Ok(new {success = true , reservedSeats = reserved, user_id, name, email, mobile, cinic});
        }

    }
}
