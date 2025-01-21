using System.Diagnostics;
using Microsoft.AspNetCore.Mvc;
using BookSpotUser.Models;

namespace BookSpotUser.Controllers;

public class HomeController : Controller
{
    private readonly ILogger<HomeController> _logger;

    public HomeController(ILogger<HomeController> logger)
    {
        _logger = logger;
    }

    public IActionResult Index()
    {
        return View();
    }

    public IActionResult Uzytkownik()
    {
        // Możesz tutaj dodać logikę pobierania danych użytkownika
          var user = new  UserViewModel
        {   
            FirstName = "Jan",
            LastName = "Kowalski",
            Department = "IT",
            
        };

        return View(user);
    }

    public IActionResult Rezerwuj()
    {
        // Możesz tutaj dodać logikę rezerwacji
        return View();
    }

    public IActionResult Historia()
    {
        // Możesz tutaj dodać logikę pobierania historii
        return View();
    }

    public IActionResult Privacy()
    {
        return View();
    }

    [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
    public IActionResult Error()
    {
        return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
    }
}