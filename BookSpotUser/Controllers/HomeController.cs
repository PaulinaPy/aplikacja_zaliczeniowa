using System.Diagnostics;
using Microsoft.AspNetCore.Mvc;
using BookSpotUser.Models;

namespace BookSpotUser.Controllers;

public class HomeController : Controller
{

    public IActionResult Index()
    {
        return View();
    }


    // public IActionResult Uzytkownik()
    // {
    //     // Możesz tutaj dodać logikę pobierania danych użytkownika
    //       var user = new  UserViewModel
    //     {   
    //         FirstName = "Jan",
    //         LastName = "Kowalski",
    //         Department = "IT",
            
    //     };

    //     return View(user);
    // }

    //  public IActionResult Rezerwacje()
    // {
    //     return View(); // Renderuje widok kalendarza
    // }

    public IActionResult Rezerwacje()
    {
        // Możesz tutaj dodać logikę rezerwacji
        var events = new List<object>
        {
            new { title = "Wydarzenie 1", start = "2023-10-01" },
            new { title = "Wydarzenie 2", start = "2023-10-05", end = "2023-10-07" },
            new { title = "Wydarzenie 3", start = "2023-10-09T12:00:00", allDay = false }
        };
        return View();
        // return Json(events);
        

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