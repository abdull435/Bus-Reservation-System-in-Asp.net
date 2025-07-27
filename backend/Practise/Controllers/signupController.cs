using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Practise.Models;
using Practise.Data;
namespace Practise.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class signupController : ControllerBase
    {
        public readonly AppDbContext _context;

        public signupController(AppDbContext context)
        {
            _context = context;
        }

        [HttpPost]
        public IActionResult signup([FromBody] User model)
        {

            _context.users.Add(model); 

            _context.SaveChanges();

            return Ok(new { succes =true });
        }
    }

}
