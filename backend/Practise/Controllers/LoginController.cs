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
    public class LoginController : ControllerBase
    {
        private readonly AppDbContext _context;
        private readonly IConfiguration _configuration;

        public LoginController(AppDbContext context, IConfiguration configuration)
        {
            _context = context;
            _configuration = configuration;
        }

        [HttpPost]
        public IActionResult Login([FromBody] LoginDTO model)
        {
            try
            {
                if (model == null || string.IsNullOrEmpty(model.email) || string.IsNullOrEmpty(model.password))
                {
                    return BadRequest(new { success = false, message = "email or Password is missing" });

                }

                var user = _context.users.FirstOrDefault(u => u.email == model.email && u.password == model.password);
                if (user == null)
                {
                    return Unauthorized(new { success = false, message = "Invalid credentials" });
                }
                var token = GenerateJwt.CreateToken(user, _configuration);

                return Ok(new { success = true, message = $"Logged in as {user.name}", token = token });
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