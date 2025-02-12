using BookSpotUser.Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Linq;
using System.Threading.Tasks;

public class UsersController : Controller
{
    private readonly ApplicationDbContext _context;

    public UsersController(ApplicationDbContext context)
    {
        _context = context;
    }

    // GET: Users/Uzytkownik
    public async Task<IActionResult> Uzytkownik()
    {
        var user = await _context.Users
            .Where(b => b.UserId == 1) // Filtruj po UserId = 1 -> do zrobienia logika żeby zaczytywało UserId zalogowanego pracownika
            .FirstOrDefaultAsync();

        if (user == null)
        {
            return NotFound();
        }

        return View(user);
    }
}
