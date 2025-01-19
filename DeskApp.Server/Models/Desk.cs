namespace DeskApp.Server.Models
{


    public class Desk // zarządzanie biurkami  
    {
        public Guid Id { get; set; } //przypisane id biurka
        public string Location { get; set; } //lokalizacja biurka
        public bool IsAvailable { get; set; } //dostępność
    }

    

}
