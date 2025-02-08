

using Microsoft.EntityFrameworkCore;

namespace BookSpotUser.Data
{
    public class ApplicationDbContext: DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options) { }
        //definiowanie połączenia z bazą SQL
        public DbSet<BookSpotUserEntity> BookedDesks { get; set;}
        // protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        // {
        //     optionsBuilder.UseSqlServer("Server=f1db;Database=PP_TEST;Trusted_Connection=True;TrustServerCertificate=True;MultipleActiveResultSets=true"); // przykład przy użyciu lokalnej bazy danych: ("Server=(localdb)\\mssqllocaldb;Database=BookSpotUser;Trusted_Connection=True;") 
        //     //w przypadku chęci użycia zewnętrzenj bazy koniecznośc w miejsce Trusted_Connection=True podanie nazwy i hasła administracyjnego, utworzonego bezposrednio po stronie używanejbazy danych (to jest moje lokalne konto Windowsowe) 
        //     base.OnConfiguring(optionsBuilder);
        // }
    }
}

// using Microsoft.EntityFrameworkCore;

// namespace BookSpotUser.Entities
// {
//     public class ApplicationDbContext : DbContext
//     {
//         // Definiowanie połączenia z bazą SQL
//         public DbSet<BookSpotUserEntity> BookedDesks { get; set; }

//         // Konstruktory
//         public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
//             : base(options)
//         {
//         }

//         protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
//         {
//             // Tylko w przypadku, gdy opcje nie zostały przekazane, używamy domyślnego połączenia
//             if (!optionsBuilder.IsConfigured)
//             {
//                 optionsBuilder.UseSqlServer("Server=f1db\\mssqlf1db;Database=PP_TEST;Trusted_Connection=True;User Id=pawlowska;Password=ddhaslo0)");
//             }
//             base.OnConfiguring(optionsBuilder);
//         }
//     }
// }