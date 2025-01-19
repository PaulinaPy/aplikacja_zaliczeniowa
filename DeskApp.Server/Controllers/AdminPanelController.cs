using Microsoft.AspNetCore.Mvc;
using DeskApp.Server.Data;
using DeskApp.Server.Models;
namespace DeskApp.Server.Controllers
{
    [ApiController]
    [Route("[controller]/[action]")]
    public class AdminPanelController : ControllerBase
    {
        private readonly ILogger<AdminPanelController> _logger;
        private DeskAppDbContext _context;

        public AdminPanelController(ILogger<AdminPanelController> logger)
        {
            _logger = logger;
        }

        [HttpGet(Name = "GetAllUsers")]
        public IEnumerable<User> GetAllUsers()
        {
            return _context.Users.ToList();
        }

        [HttpDelete(Name = "DeleteUser")]
        public void DeleteUser(int id)
        {
            _context.Users.Remove(_context.Users.Find(id));
            _context.SaveChanges();
        }

        [HttpPost(Name = "AddUser")]
        public void AddUser(User user)
        {
            _context.Users.Add(user);
            _context.SaveChanges();
        }
    }
}
