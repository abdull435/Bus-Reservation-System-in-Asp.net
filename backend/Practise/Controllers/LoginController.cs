using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
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

        public LoginController(AppDbContext context)
        {
            _context = context;
        }

        [HttpPost]
        public IActionResult Login([FromBody] LoginDTO model)
        {
            if (model == null || string.IsNullOrEmpty(model.email) || string.IsNullOrEmpty(model.password)) {
                return BadRequest(new { success = false, message = "email or Password is missing" });

            }

            //Console.WriteLine($"Email: {model.email}, Password: {model.password}");


            var user = _context.users.FirstOrDefault(u => u.email == model.email && u.password == model.password);
            if (user == null)
            {
                return Unauthorized(new { success = false, message = "Invalid credentials" });
            }
            else
            {
                HttpContext.Session.SetInt32("user_id", user.user_id);
                HttpContext.Session.SetString("name", user.name);
                HttpContext.Session.SetString("email", user.email);
                HttpContext.Session.SetInt32("mobile", user.mobile);
                HttpContext.Session.SetInt32("cinic", user.cinic);

            }

                return Ok(new { success = true, message = $"Logged in as {HttpContext.Session.GetString("mobile")}" });
        }

    }
}