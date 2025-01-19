namespace DeskApp.Server.Models;

public class User // zarządzanie użytkownikami
{
    public Guid Id { get; set; } //przypisane id użytkownika
    public string Name { get; set; } //imię i nazwisko użytkownika
    public string Email { get; set; } //firmowy adres email
    public string Role { get; set; } // "Administrator", "User", "ProjectManager"
}