namespace BookSpotUser.Data
{
    public class BookSpotUserEntity
    {
        public int Id {get; set;}
        public int UserId {get; set;} = default;
        public string FirstName {get; set;} = default;
        public string LastName {get; set;} = default;
       public DateTime BookedDate { get; set; }
        public int DeskId {get; set;} = default;


    }
}