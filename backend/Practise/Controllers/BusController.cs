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
    public class BusController : ControllerBase
    {
        public readonly AppDbContext _context;

        public BusController(AppDbContext context)
        {
            _context = context;
        }

        [HttpPost("add-bus")]
        public IActionResult addBus([FromBody] addBusDTO model)
        {
            var bus = new Bus
            {
                bus_name = model.bus_name,
                total_seats = model.total_seats,
                bus_type = model.bus_type,
            };
            _context.bus.Add(bus);
            _context.SaveChanges();

            return Ok(new { success = true });
        }

        [HttpPut("update-bus/{id}")]

        public async Task<IActionResult> updateBus(int id, [FromBody] addBusDTO model)
        {
            var bus = await _context.bus.FindAsync(id);

            if(bus == null)
            {
                return BadRequest("Bus Id not found");
            }

            bus.bus_name =model.bus_name;
            bus.bus_type =model.bus_type;
            bus.total_seats = model.total_seats;

            await _context.SaveChangesAsync();

            return Ok(new{success = true});

        }
    }
}
