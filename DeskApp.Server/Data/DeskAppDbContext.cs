using Microsoft.EntityFrameworkCore;
using DeskApp.Server.Models;

namespace DeskApp.Server.Data
{
    public class DeskAppDbContext : DbContext
    {
        public DeskAppDbContext(DbContextOptions<DeskAppDbContext> options) : base(options) { }

        // Add DbSet properties for your models
        public DbSet<User> Users { get; set; }
        public DbSet<Desk> Desks { get; set; }
        public DbSet<Reservation> Reservations { get; set; }
    }
}
