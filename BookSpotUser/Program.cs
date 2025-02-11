using BookSpotUser.Data;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddControllersWithViews();
// Dodaj konfigurację DbContext
builder.Services.AddDbContext<ApplicationDbContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));
var app = builder.Build();

// Configure the HTTP request pipeline.
if (!app.Environment.IsDevelopment())
{
    app.UseExceptionHandler("/Home/Error");
    // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
    app.UseHsts();
}

app.UseHttpsRedirection();
app.UseStaticFiles();

app.UseRouting();

app.UseAuthorization();

app.UseEndpoints(endpoints =>
{
    
    // Domyślna trasa
    endpoints.MapControllerRoute(
        name: "default",
        pattern: "{controller=Home}/{action=Index}/{id?}");

     // Trasa dla historii rezerwacji
    endpoints.MapControllerRoute(
        name: "History",
        pattern: "{controller=BookingHistory}/{action=Historia}/{id?}");   

});

app.Run();

// app.MapControllerRoute(
//     name: "default",
//     pattern: ({controller=RezerwacjeController}/{action=Rezerwacje});








var app1 = builder.Build();

// Konfiguracja middleware
if (app.Environment.IsDevelopment())
{
    app.UseDeveloperExceptionPage();
}
else
{
    app.UseExceptionHandler("/Home/Error");
    app.UseHsts();
}

app.UseHttpsRedirection();
app.UseStaticFiles();

app.UseRouting();

app.UseAuthorization();

// app.MapControllerRoute(
//     name: "defaul",
//     pattern: "{controller=Home}/{action=Index}/{id?}");


// app.UseEndpoints(endpoints =>
// {
//     endpoints.MapControllerRoute(
//         name: "BookedDesks",
//         pattern: "{controller=BookedDesks}/{action=Index}/{id?}");
// });


app.Run();
