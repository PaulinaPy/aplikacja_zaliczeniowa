using Microsoft.AspNetCore.Mvc;
using DeskApp.Server.Data;
using DeskApp.Server.Models;
using Microsoft.EntityFrameworkCore;

namespace DeskApp.Server.Controllers
{
    [ApiController]
    [Route("api/[controller]/[action]")]
    public class ReservationsController : ControllerBase
    {
        private readonly ILogger<ReservationsController> _logger;
        private readonly DeskAppDbContext _context;

        public ReservationsController(ILogger<ReservationsController> logger, DeskAppDbContext context)
        {
            _logger = logger;
            _context = context ?? throw new ArgumentNullException(nameof(context));
        }

        [HttpGet(Name = "GetAllReservations")]
        public async Task<IEnumerable<ReservationDto>> GetAllReservations()
{
    var reservations = await _context.Reservations
        .Select(r => new ReservationDto
        {
            UserName = _context.Users.Where(u => u.Id == r.UserId).Select(u => u.FirstName).FirstOrDefault(),
            UserLastName = _context.Users.Where(u => u.Id == r.UserId).Select(u => u.LastName).FirstOrDefault(),
            UserEmail = _context.Users.Where(u => u.Id == r.UserId).Select(u => u.Email).FirstOrDefault(),
            DeskName = _context.Desks.Where(d => d.Id == r.DeskId).Select(d => d.label).FirstOrDefault(),
            BookedDate = r.BookedDate
        })
        .ToListAsync();

    return reservations;
}


        [HttpGet(Name = "GetReservationsByDate")]
        public async Task<IEnumerable<Reservation>?> GetReservationsByDate(DateTime date)
        {
            return await _context.Reservations.Where(x => x.BookedDate == date).ToListAsync();
        }
        [HttpPost(Name = "SaveReservation")]
        public async Task<ActionResult> SaveReservation([FromBody] Reservation reservation)
        {
            var isReservationInDb = await _context.Reservations.FirstOrDefaultAsync(x => x.UserId == reservation.UserId && x.BookedDate == reservation.BookedDate);
            if (isReservationInDb != null)
            {
                return BadRequest("Rezerwacja na ten dzień już istnieje!");
            }
            await _context.Reservations.AddAsync(reservation);
            await _context.SaveChangesAsync();
            return Ok();
        }

        [HttpGet(Name = "GetReservationsByUserId")]
        public async Task<IEnumerable<Reservation>?> GetReservationsByUserId(Guid id)
        {
            return await _context.Reservations.Where(x => x.UserId == id).ToListAsync();
        }

        [HttpGet(Name = "GetReservationsHistoryByUserId")]
        public async Task<IEnumerable<ReservationDto>?> GetReservationsHistoryByUserId(Guid id)
        {
            var reservations = await _context.Reservations
        .Where(r => r.UserId == id) // Filter by userId
        .Select(r => new ReservationDto
        {
            UserName = _context.Users.Where(u => u.Id == r.UserId).Select(u => u.FirstName).FirstOrDefault(),
            UserLastName = _context.Users.Where(u => u.Id == r.UserId).Select(u => u.LastName).FirstOrDefault(),
            UserEmail = _context.Users.Where(u => u.Id == r.UserId).Select(u => u.Email).FirstOrDefault(),
            DeskName = _context.Desks.Where(d => d.Id == r.DeskId).Select(d => d.label).FirstOrDefault(),
            BookedDate = r.BookedDate
        })
        .ToListAsync();

    return reservations;
        }

        [HttpDelete(Name = "DeleteReservation")]
        public async Task<ActionResult> DeleteReservation(Guid id)
        {
            var reservationToDelete = await _context.Reservations.FirstOrDefaultAsync(x => x.Id == id);
            if (reservationToDelete == null)
            {
                return NotFound();
            }
            _context.Reservations.Remove(reservationToDelete);
            await _context.SaveChangesAsync();
            return Ok();
        }

        public class ReservationDto
        {
            public string UserName { get; set; }
            public string UserLastName { get; set; }
            public string UserEmail { get; set; }
            public string DeskName { get; set; }
            public DateTime BookedDate { get; set; }
        }

    }


}