using Microsoft.AspNetCore.Mvc;
using DeskApp.Server.Data;
using DeskApp.Server.Models;
using Microsoft.EntityFrameworkCore;
namespace DeskApp.Server.Controllers
{
    [ApiController]
    [Route("api/[controller]/[action]")]
    public class AdminPanelController : ControllerBase
    {
        private readonly ILogger<AdminPanelController> _logger;
        private readonly DeskAppDbContext _context;

        public User Users { get; private set; }

        public AdminPanelController(ILogger<AdminPanelController> logger, DeskAppDbContext context)
        {
            _logger = logger;
            _context = context ?? throw new ArgumentNullException(nameof(context));
        }

        [HttpGet(Name = "GetAllUsers")]
        public IEnumerable<User> GetAllUsers()
        {
            return _context.Users.ToList();
        }

        [HttpDelete(Name = "DeleteUser")]
        public async Task<ActionResult> DeleteUser(Guid id)
        {
            try
            {
                var userToDelete = await _context.Users.FirstOrDefaultAsync(x => x.Id == id);
                if (userToDelete == null)
                {
                    return NotFound();
                }
                _context.Users.Remove(userToDelete);
                await _context.SaveChangesAsync();
                return Ok();

            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost(Name = "AddUser")]
        public async Task<ActionResult> AddUser([FromBody] User userToAdd)
        {
            try
            {
                if (userToAdd == null)
                {
                    return BadRequest("Invalid user data.");
                }
                var sm = new SharedMethods();
                userToAdd.Id = new Guid();
                userToAdd.Password = sm.HashPassword(userToAdd.Password);
                await _context.Users.AddAsync(userToAdd);
                await _context.SaveChangesAsync();

                return CreatedAtAction(nameof(AddUser), new { id = userToAdd.Id }, userToAdd);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost(Name = "EditUser")]
        public async Task<ActionResult> EditUser([FromBody] User userToEdit)
        {
            try
            {
                if (userToEdit == null)
                {
                    return BadRequest("Invalid user data.");
                }
                var user = await _context.Users.FirstOrDefaultAsync(x => x.Id == userToEdit.Id);
                if (user == null)
                {
                    return NotFound();
                }
                user.FirstName = userToEdit.FirstName;
                user.LastName = userToEdit.LastName;
                user.Email = userToEdit.Email;
                user.Team = userToEdit.Team;
                user.Position = userToEdit.Position;
                user.Access = userToEdit.Access;
                await _context.SaveChangesAsync();
                return Ok();
            }
            catch (Exception ex)
            { return BadRequest(ex.Message); }



        }
        [HttpPost(Name = "ChangePassword")]
        public async Task<ActionResult> ChangePassword([FromBody] ChangePasswordRequest changePasswordRequest)
        {
            try
            {
                if (changePasswordRequest == null)
                {
                    return BadRequest("Incorrect data!");
                }
                var user = await _context.Users.FirstOrDefaultAsync(x => x.Id == changePasswordRequest.UserId);
                if (user == null)
                {
                    return NotFound();
                }
                var sm = new SharedMethods();
                user.Password = sm.HashPassword(changePasswordRequest.Password);
                await _context.SaveChangesAsync();
                return Ok();
            }
            catch (Exception ex)
            { return BadRequest(ex.Message); }
        }
        public class ChangePasswordRequest
        {
            public Guid UserId { get; set; }
            public string Password { get; set; }
        }

        [HttpGet(Name = "GetAllDesks")]
        public IEnumerable<Desk> GetAllDesks()
        {
            return _context.Desks.ToList();
        }

        [HttpPost(Name = "SaveDesks")]
        public async Task<ActionResult> SaveDesks([FromBody] List<Desk> desks)
        {
            foreach (var desk in desks)
            {
                var isDeskInDb = await _context.Desks.FirstOrDefaultAsync(x => x.Id == desk.Id);
                if (isDeskInDb == null)
                {
                    await _context.Desks.AddAsync(desk);
                }
                else
                {
                    isDeskInDb.left = desk.left;
                    isDeskInDb.top = desk.top;
                }

            }
            await _context.SaveChangesAsync();
            return Ok();
        }

        [HttpDelete(Name = "DeleteDesk")]
        public async Task<ActionResult> DeleteDesk(Guid id)
        {
            try
            {
                var deskToDelete = await _context.Desks.FirstOrDefaultAsync(x => x.Id == id);
                if (deskToDelete == null)
                {
                    return NotFound();
                }
                _context.Desks.Remove(deskToDelete);
                await _context.SaveChangesAsync();
                return Ok();

            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }

}
