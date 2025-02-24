namespace DeskApp.Server.Models;

public class User // zarządzanie użytkownikami
{
    public Guid Id { get; set; }
    public string FirstName { get; set; }
    public string LastName { get; set; }
    public string Email { get; set; }
    public string Password { get; set; }
    public string Team { get; set; }
    public string Position { get; set; }
    public string Access { get; set; }
    //public bool IsDeleted { get; set; }
    //public string DeleteReason { get; set; }
}
