using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Routing;
using Practise.Data;
using Practise.DTO;
using Practise.Models;

namespace Practise.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class ScheduleController : ControllerBase
    {
        public readonly AppDbContext _context;

        public ScheduleController(AppDbContext context)
        {
            _context = context;
        }
        [Authorize(Roles = "Admin")]
        [HttpPost("add-schedule")]
        public IActionResult addSchedules([FromBody] addScheduleDTO model)
        {
            //Console.WriteLine($"Bus ID: {model.bus_id}");
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

        [Authorize(Roles = "Admin")]
        [HttpPut("update-schedule/{id}")]
        public async Task<IActionResult> updateSchedule(int id, [FromBody] addScheduleDTO model)
        {
            var schedule = await _context.schedules.FindAsync(id);
            if (schedule == null)
            {
                return BadRequest("Not Found");
            }

            schedule.bus_id = model.bus_id;
            schedule.route_id = model.route_id;
            schedule.departure_time = model.departure_time;
            schedule.arrival_time = model.arrival_time;
            schedule.date = model.date;
            schedule.price = model.price;


            await _context.SaveChangesAsync();

            return Ok(new { success = true });
        }

        [HttpGet("get-schedules")]
        public IActionResult Get()
        {
            var schedules = _context.schedules.ToList();

            return Ok(new { schedules });
        }

    }
}
