using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Practise.Data;
using Practise.Models;

namespace Practise.Controllers
{
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
        public IActionResult addBus([FromBody] Bus model)
        {
            _context.bus.Add(model);
            _context.SaveChanges();

            return Ok(new { success = true });
        }

        [HttpPut("update-bus/{id}")]

        public async Task<IActionResult> updateBus(int id, [FromBody] Bus model)
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
