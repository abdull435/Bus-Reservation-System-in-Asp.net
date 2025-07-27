using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Practise.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class logoutController : ControllerBase
    {
        [HttpGet]

        public IActionResult logout()
        {
            HttpContext.Session.Clear();

            return Ok(new { succes = true, message = "Logout succesfully" });
        }
    }
}
