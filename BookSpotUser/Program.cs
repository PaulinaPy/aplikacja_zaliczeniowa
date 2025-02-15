// using Microsoft.AspNetCore.Identity;
using BookSpotUser.Data;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;


var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddControllersWithViews();
//Dodaj konfiguracje Identity
// builder.Services.AddHttpContextAccessor();
// Dodaj konfigurację DbContext
builder.Services.AddDbContext<ApplicationDbContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));
    
var app = builder.Build();

// Dodaj usługi Identity
// builder.Services.AddIdentity<IdentityUser, IdentityRole>()
//     .AddEntityFrameworkStores<ApplicationDbContext>()
//     .AddDefaultTokenProviders();


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

app.UseAuthentication(); // Włącz autoryzację
app.UseAuthorization();

app.UseEndpoints(endpoints =>
{
    
    
   app.UseEndpoints(endpoints =>
{   // Domyślna trasa
    endpoints.MapControllerRoute(
        name: "default",
        pattern: "{controller=Home}/{action=Index}/{id?}");
    // endpoints.MapControllerRoute(
    //     name: "userdetails",
    //     pattern: "{controller=Users}/{action=Uzytkownik}/{id?}");     //-> OFF - NIE DZIAŁA??
});


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
