using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Practise.Data;
using Practise.Models;

namespace Practise.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class addBusController : ControllerBase
    {
        public readonly AppDbContext _context;

        public addBusController(AppDbContext context)
        {
            _context = context;
        }

        [HttpPost]
        public IActionResult addBus([FromBody] Bus model)
        {
            _context.bus.Add(model);
            _context.SaveChanges();

            return Ok(new { success = true });
        }
    }
}
