namespace DeskApp.Server.Models;

public class Reservation // rezerwacje biurek
    {
        private DateTime _startDate { get; set; }
        private DateTime _endDate { get; set; }
        public Guid Id { get; set; } //indywidualny nr rezerwacji 
        public int DeskId { get; set; } //przypisane id biurka
        public int UserId { get; set; } //przypisane id użytkownika
        public DateTime StartDate
        {
            get { return _startDate; }
            set { _startDate = value; }
        } //data rozpoczęcia rezerwacji 
        public DateTime EndDate
        {
            get { return _endDate; }
            set { _endDate = value; }
        }
        //data zakończenia rezerwacji

        public bool IsConfirmed { get; set; } //potwierdzenie rezerwacji 


    }