using DeskApp.Server.Data;
using DeskApp.Server.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace YourApp.Controllers
{
    [ApiController]
    [Route("api/[controller]/[action]")]
    public class AuthController : ControllerBase
    {
        private readonly IConfiguration _config;
        private readonly DeskAppDbContext _context;
        public AuthController(IConfiguration config, DeskAppDbContext context)
        {
            _config = config;
            _context = context ?? throw new ArgumentNullException(nameof(context));
        }


        [HttpPost(Name = "login")]
        public async Task<IActionResult> Login([FromBody] Credentials credentials)
        {
            try
            {
                var user = await _context.Users.FirstOrDefaultAsync(x => x.Email == credentials.Email && x.Password == credentials.Password);
                if (user == null)
                {
                    return Unauthorized("Błędny login lub hasło!");
                }
                var token = GenerateJwtToken(user);
                return Ok(new { token, userId = user.Id, role = user.Access });
            }
            catch (Exception ex)
            { return BadRequest(ex.Message); }
        }
        private string GenerateJwtToken(User user)
        {
            var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_config["Jwt:Key"]));
            var credentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);

            var claims = new[]
            {
                new Claim(ClaimTypes.Name, user.Id.ToString())
            };

            var token = new JwtSecurityToken(
                _config["Jwt:Issuer"],
                _config["Jwt:Audience"],
                claims,
                expires: DateTime.UtcNow.AddHours(1),
                signingCredentials: credentials
            );

            return new JwtSecurityTokenHandler().WriteToken(token);
        }

    }
    public class Credentials
    {
        public required string Email { get; set; }
        public required string Password { get; set; }
    }

}
