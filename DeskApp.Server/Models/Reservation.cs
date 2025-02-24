namespace DeskApp.Server.Models;

public class Reservation // rezerwacje biurek
    {
        private DateTime _bookedDate { get; set; }
        public Guid Id { get; set; } //indywidualny nr rezerwacji 
        public Guid DeskId { get; set; } //przypisane id biurka
        public Guid UserId { get; set; } //przypisane id użytkownika
        public DateTime BookedDate
        {
            get { return _bookedDate; }
            set { _bookedDate = value; }
        }
        public bool IsConfirmed { get; set; } //potwierdzenie rezerwacji 


    }