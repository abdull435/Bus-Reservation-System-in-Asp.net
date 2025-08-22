using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Practise.Data;
using Practise.Models;
using Practise.DTO;

namespace Practise.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class UpdateUserController : ControllerBase
    {
        private readonly AppDbContext _context;

        public UpdateUserController(AppDbContext context)
        {
            _context = context;
        }

        [HttpPut("{user_id}")]
        public async Task<IActionResult> UpdateUser(int user_id ,[FromBody] UserDTO model)
        {
            try
            {
                var user = await _context.users.FindAsync(user_id);
                if (user == null)
                {
                    return BadRequest(new { message = "User not found" });
                }
                user.name = model.name;
                user.email = model.email;
                user.cinic = model.cinic;
                user.mobile = model.mobile;

                var hashedPassword = BCrypt.Net.BCrypt.HashPassword(model.password);
                user.password = hashedPassword;

                await _context.SaveChangesAsync();

                return Ok(new { success = true, message = "User Update Successfully" });
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
