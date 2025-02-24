using Microsoft.AspNetCore.Mvc;
using DeskApp.Server.Data;
using DeskApp.Server.Models;
using Microsoft.EntityFrameworkCore;

namespace DeskApp.Server.Controllers
{
    [ApiController]
    [Route("api/[controller]/[action]")]
    public class UserController : ControllerBase
    {
        private readonly ILogger<UserController> _logger;
        private readonly DeskAppDbContext _context;

        public UserController(ILogger<UserController> logger, DeskAppDbContext context)
        {
            _logger = logger;
            _context = context ?? throw new ArgumentNullException(nameof(context));
        }

        [HttpGet(Name = "GetById")]
        public async Task<ActionResult> GetById(Guid id)
        {
            var user = await _context.Users.FirstOrDefaultAsync(x => x.Id == id);
            if (user == null)
            {
                return NotFound();
            }
            var userData = new { user.Id, user.FirstName, user.LastName, user.Email, user.Team, user.Position, user.Access };
            return Ok(userData);
        }

        [HttpGet(Name = "GetDeskById")]
        public async Task<ActionResult> GetDeskById(Guid id)
        {
            var desk = await _context.Desks.FirstOrDefaultAsync(x => x.Id == id);
            if (desk == null)
            {
                return NotFound();
            }
            return Ok(desk);
        }
    }
}