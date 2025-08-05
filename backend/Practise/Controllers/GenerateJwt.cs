using System;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using Practise.Models;

namespace Practise.Controllers
{
    public static class GenerateJwt
    {
        public static string CreateToken(User user, IConfiguration configuration)
        {
            var jwtSettings = configuration.GetSection("Jwt");

            //var claims = new[]
            //{
            //    new Claim(ClaimTypes.NameIdentifier, user.user_id.ToString()),
            //    new Claim(ClaimTypes.Name, user.name),
            //    new Claim(ClaimTypes.Email, user.email),
            //    new Claim("Mobile", user.mobile.ToString()),
            //    new Claim("Cnic", user.cinic.ToString())
            //};

            var claims = new[]
            {
                new Claim("userId", user.user_id.ToString()),
                new Claim("name", user.name),
                new Claim("email", user.email),
                new Claim("mobile", user.mobile.ToString()),
                new Claim("cnic", user.cinic.ToString())
            };


            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(jwtSettings["Key"]));
            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

            var token = new JwtSecurityToken(
                issuer: jwtSettings["Issuer"],
                audience: jwtSettings["Audience"],
                claims: claims,
                expires: DateTime.UtcNow.AddHours(1),
                signingCredentials: creds);

            return new JwtSecurityTokenHandler().WriteToken(token);
        }
    }
}
