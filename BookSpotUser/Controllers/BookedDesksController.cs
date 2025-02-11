using BookSpotUser.Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Linq;
using System.Threading.Tasks;

public class BookedDesksController : Controller
{
    private readonly ApplicationDbContext _context;

    public BookedDesksController(ApplicationDbContext context)
    {
        _context = context;
    }

    // GET: BookedDesks
    // public async Task<IActionResult> Index()
    // {
    //     return View(await _context.BookedDesks.ToListAsync());
    // }

  // GET: Bookings
    public async Task<IActionResult> Index()
    {
        var bookings = await _context.BookedDesks
        .Where(b => b.UserId == 71) // Filtruj po UserId = 71 -> do zrobienia logika żeby zaczytywało UserId zalogowanego pracownika
        .OrderByDescending(b => b.BookedDate)
        .ToListAsync();
        return View(bookings);
    }

    // GET: Bookings/Details/{id}
    public async Task<IActionResult> Details(int? id)
    {
        if (id == null || _context.BookedDesks == null)
        {
            return NotFound();
        }

        var booking = await _context.BookedDesks
            .FirstOrDefaultAsync(m => m.Id == id);
        if (booking == null)
        {
            return NotFound();
        }

        return View(booking);
    }
    // GET: BookedDesks/Create
    public IActionResult Create()
    {
        return View();
    }

    // POST: BookedDesks/Create
    [HttpPost]
    [ValidateAntiForgeryToken]
    public async Task<IActionResult> Create([Bind("IId, UserId, FirstName, LastName, BookedDate, DeskId")] BookSpotUserEntity bookedDesk)
    {
        if (ModelState.IsValid)
        {
            _context.Add(bookedDesk);
            await _context.SaveChangesAsync();
            return RedirectToAction(nameof(Index));
        }
        return View(bookedDesk);
    }

// GET: BookedDesks/Edit/5
public async Task<IActionResult> Edit(int? id)
{
    if (id == null)
    {
        return NotFound();
    }

    var bookedDesk = await _context.BookedDesks.FindAsync(id);
    if (bookedDesk == null)
    {
        return NotFound();
    }
    return View(bookedDesk);
}

// POST: BookedDesks/Edit/5
[HttpPost]
[ValidateAntiForgeryToken]
public async Task<IActionResult> Edit(int id, [Bind("FirstName,LastName,BookedDate,DeskId")] BookSpotUserEntity bookedDesk)
{
    if (id != bookedDesk.Id)
    {
        return NotFound();
    }

    if (ModelState.IsValid)
    {
        try
        {
            _context.Update(bookedDesk);
            await _context.SaveChangesAsync();
        }
        catch (DbUpdateConcurrencyException)
        {
            if (!BookedDeskExists(bookedDesk.Id))
            {
                return NotFound();
            }
            else
            {
                throw;
            }
        }
        return RedirectToAction(nameof(Index));
    }
    // Debugowanie
    Console.WriteLine($"Edit GET: BookedDesk ID = {id}");
    return View(bookedDesk);
}


  // GET: BookedDesks/Delete/5
public async Task<IActionResult> Delete(int? id)
{
    if (id == null)
    {
        return NotFound();
    }

    var bookedDesk = await _context.BookedDesks
        .FirstOrDefaultAsync(m => m.Id == id);
    if (bookedDesk == null)
    {
        return NotFound();
    }

    return View(bookedDesk);
}

// POST: BookedDesks/Delete/5
 [HttpPost]
[ValidateAntiForgeryToken]
public async Task<IActionResult> Delete(int id)
{
    var bookedDesk = await _context.BookedDesks.FindAsync(id);
    if (bookedDesk != null)
    {
        _context.BookedDesks.Remove(bookedDesk);
        await _context.SaveChangesAsync();
    }
    return RedirectToAction(nameof(Index));
    
}



private bool BookedDeskExists(int id)
{
    return _context.BookedDesks.Any(e => e.Id == id);
}
}