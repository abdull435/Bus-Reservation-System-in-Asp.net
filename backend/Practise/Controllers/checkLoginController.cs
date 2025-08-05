using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Practise.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class checkLoginController : ControllerBase
    {
        [HttpGet]
        public IActionResult checkLogin()
        {
            var loggedIn = HttpContext.Session.GetString("name") != null;

            return Ok(new{  loggedIn });
        }
    }
}
