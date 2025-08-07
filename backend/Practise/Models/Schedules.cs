using System.ComponentModel.DataAnnotations;
using ZstdSharp.Unsafe;

namespace Practise.Models
{
    public class Schedules
    {
        [Key]
        public int schedule_id { get; set; }
        public int bus_id { get; set; }
        public int route_id { get; set; }
        public int available_seats { get; set; }
        public DateTime departure_time { get; set; }
        public DateTime arrival_time { get; set; }
        public DateTime date { get; set; }

        public float price { get; set; }
        public Routes routes { get; set; }
        public Bus bus { get; set; }
    }
}
