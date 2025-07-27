using System.ComponentModel.DataAnnotations;

namespace Practise.Models
{
    public class User
    {
        [Key]
        public int user_id { get; set; }
        public string name { get; set; }
        public string email { get; set; }
        public string password { get; set; }
        public int mobile { get; set; }
        public int cinic { get; set; }
    }
}