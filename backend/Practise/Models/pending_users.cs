using Practise.Controllers;
using System.ComponentModel.DataAnnotations;

namespace Practise.Models
{
    public class pending_users
    {
        [Key]
        public int id { get; set; }
        public string name { get; set; }
        public string email { get; set; }
        public string password { get; set; }
        public string mobile { get; set; }
        public string cinic { get; set; }
        public string role { get; set; }
        public string verification_code { get; set; }

        public DateTime expires_at { get; set; }
    }
}
