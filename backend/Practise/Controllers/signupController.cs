using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Practise.Data;
using Practise.DTO;
using Practise.Models;
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
        public IActionResult Signup([FromBody] UserDTO model)
        {
            try
            {
                if (string.IsNullOrWhiteSpace(model.name) ||
                    string.IsNullOrWhiteSpace(model.email) ||
                    string.IsNullOrWhiteSpace(model.password))
                {
                    return BadRequest(new { success = false, message = "Missing required fields" });
                }

                var addUser = new User
                {
                    name = model.name,
                    email = model.email,
                    mobile = model.mobile,
                    cinic = model.cinic,
                    password = model.password,
                    role = "Customer"
                };

                _context.users.Add(addUser);
                _context.SaveChanges();

                return Ok(new { success = true, message = "User created successfully" });
            }
            catch (DbUpdateException dbEx)
            {
                return StatusCode(500, new { success = false, message = "Database error occurred", error = dbEx.InnerException?.Message });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { success = false, message = "An unexpected error occurred", error = ex.Message });
            }
        }

    }

}
