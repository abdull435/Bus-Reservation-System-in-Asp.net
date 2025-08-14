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

        [HttpPut("update-user/{user_id}")]
        public async Task<IActionResult> UpdateUser(int user_id ,[FromBody] userUpdateDTO model)
        {
            var user = await _context.users.FindAsync(user_id);
            if (user == null)
            {
                return BadRequest(new{ message = "User not found" });
            }
            user.name = model.name;
            user.email = model.email;
            user.cinic = model.cinic;
            user.mobile = model.mobile;
            user.password = model.password;

            await _context.SaveChangesAsync();

            return Ok(new{ message ="User Update Successfully"});
        }
        
    }
}
