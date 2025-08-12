using System.ComponentModel.DataAnnotations;

namespace Practise.DTO
{
    public class addBusDTO
    {
        [Key]
        public int bus_id { get; set; }
        public string bus_name { get; set; }
        public int total_seats { get; set; }
        public string bus_type { get; set; }
    }
}
