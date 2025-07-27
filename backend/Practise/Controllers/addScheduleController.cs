using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Routing;
using Practise.Data;
using Practise.Models;
using Practise.DTO;

namespace Practise.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class addScheduleController : ControllerBase
    {
        public readonly AppDbContext _context;

        public addScheduleController(AppDbContext context)
        {
            _context = context;
        }

        [HttpPost]
        public IActionResult addSchedules([FromBody] addScheduleDTO model)
        {
            Console.WriteLine($"Bus ID: {model.bus_id}");
            var schedule = new Schedules
            {
                bus_id = model.bus_id,
                route_id = model.route_id,
                departure_time = model.departure_time,
                arrival_time = model.arrival_time,
                date = model.date,
                price = model.price,
            };

            _context.schedules.Add(schedule);
            _context.SaveChanges();

            return Ok(new { success = true });
        }

    }
}
