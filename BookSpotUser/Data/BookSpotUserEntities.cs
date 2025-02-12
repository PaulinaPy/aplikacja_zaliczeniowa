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

    public class UsersEntity
    {
        public int Id {get; set;}
        public int UserId {get; set;}
        public string? FirstName {get; set;} = default;
        public string? LastName {get; set;} = default;
        public string? Email {get; set;} = default;
        public string? StartingPassword {get; set;} = default;
        public string? Team {get; set;} = default;
        public string? Role {get; set;} = default;
        public string? AccessRights {get; set;} = default;

    }

}