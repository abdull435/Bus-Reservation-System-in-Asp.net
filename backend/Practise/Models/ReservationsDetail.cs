using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace Practise.Models
{
    public class ReservationsDetail
    {
        [Key]

        public int detail_id { get; set; }
        public int reservation_id {  get; set; }
        public int seat_number {  get; set; }
        public string gender { get; set; }
        public Reservations reservations { get; set; }
    }
}
