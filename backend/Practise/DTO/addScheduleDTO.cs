using System.ComponentModel.DataAnnotations;

namespace Practise.DTO
{
    public class addScheduleDTO
    {
        //[Key]
        //public int schedule_id { get; set; }
        public int bus_id { get; set; }
        public int route_id { get; set; }
        public DateTime departure_time { get; set; }
        public DateTime arrival_time { get; set; }
        public DateTime date { get; set; }

        public float price { get; set; }
    }
}
