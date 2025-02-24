using Microsoft.EntityFrameworkCore;
using DeskApp.Server.Data;
using DeskApp.Server.Models;

var builder = WebApplication.CreateBuilder(args);
//builder.Services.AddCors(options =>
//{
//    options.AddPolicy("AllowAngular", policy =>
//    {
//        policy.WithOrigins("http://localhost:4200") // Adres Angulara
//              .AllowAnyHeader()
//              .AllowAnyMethod();
//    });
//});



// Add services to the container.

builder.Services.AddDbContext<DeskAppDbContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));
builder.Services.AddControllers();
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAllOrigins", policy =>
    {
        policy.AllowAnyOrigin()
        .AllowAnyMethod()
        .AllowAnyHeader();
    });
});
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();
using (var scope = app.Services.CreateScope())
{
    var dbContext = scope.ServiceProvider.GetRequiredService<DeskAppDbContext>();
    dbContext.Database.EnsureCreated();
    if (!dbContext.Users.Any())
    {
        dbContext.Users.Add(new User
        {
            Id = Guid.NewGuid(),  
            FirstName = "Admin",
            LastName = "User",
            Email = "admin@example.com",
            Password = "d9b5f58f0b38198293971865a14074f59eba3e82595becbe86ae51f1d9f1f65e",
            Position = "",
            Team = "",
            Access = "ADMIN"  
        });

        dbContext.SaveChanges();
    }
}


app.UseDefaultFiles();
app.UseStaticFiles();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseCors("AllowAllOrigins");
app.UseAuthorization();

app.MapControllers();


app.Run();
