using System.ComponentModel.DataAnnotations;

namespace Practise.DTO
{
    public class UserDTO
    {
        [Key]
        public int user_id { get; set; }
        public string name { get; set; }
        public string email { get; set; }
        public string password { get; set; }
        public string mobile { get; set; }
        public string cinic { get; set; }
    }
}
