using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace Practise.Models
{
    public class Reservations
    {
        [Key]
        public int reservation_id { get; set; }
        public int user_id { get; set; }    
        public string name { get; set; }
        public string email { get; set; }
        public string cinic { get; set; }
        public DateTime reservation_date {  get; set; }

        public float price { get; set; }
        public int total_seats { get; set; }
        public float total_price { get; set; }
        public int schedule_id { get; set; }
        public Schedules schedule { get; set; }

        //[JsonIgnore]
        public List<ReservationsDetail> reservationsDetail { get; set; }

    }
}
