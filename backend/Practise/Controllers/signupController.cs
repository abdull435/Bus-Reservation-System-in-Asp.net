using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Org.BouncyCastle.Crypto.Generators;
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

                var checkEmail = _context.users.FirstOrDefault(u => u.email == model.email);

                if (checkEmail != null) 
                {
                    return BadRequest(new { success = false, message = "Email Already Registered" });
                }


                var code = new Random().Next(100000, 999999).ToString();

                var hashedPassword = BCrypt.Net.BCrypt.HashPassword(model.password);

                var addUser = new pending_users
                {
                    name = model.name,
                    email = model.email,
                    mobile = model.mobile,
                    cinic = model.cinic,
                    password = hashedPassword,
                    role = "Customer",
                    verification_code =code,
                    expires_at = DateTime.UtcNow.AddMinutes(10),
                };

                _context.pending_users.Add(addUser);
                _context.SaveChanges();

                Verification.SendVerificationCode(model.email, code);

                return Ok(new { success = true, message = "Enter verification code sent to email" });
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

        [HttpPost("verify-code")]
        public async Task<IActionResult> VerifyCode([FromBody] VerifyCodeDTO model)
        {
            try
            {
                var pendingUser = await _context.pending_users
                    .FirstOrDefaultAsync(p => p.email == model.email && p.verification_code == model.code);

                if (pendingUser == null)
                    return BadRequest(new { message = "Invalid code" });

                if (pendingUser.expires_at < DateTime.UtcNow)
                {
                    _context.pending_users.Remove(pendingUser);
                    await _context.SaveChangesAsync();
                    return BadRequest(new { message = "Code expired" });
                }

                // Move data to users table
                var newUser = new User
                {
                    name = pendingUser.name,
                    email = pendingUser.email,
                    password = pendingUser.password,
                    mobile = pendingUser.mobile,
                    cinic = pendingUser.cinic,
                    role = pendingUser.role
                };
                _context.users.Add(newUser);

                _context.pending_users.Remove(pendingUser);

                await _context.SaveChangesAsync();

                return Ok(new { success = true, message = "Account Created Succesfully" });
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
