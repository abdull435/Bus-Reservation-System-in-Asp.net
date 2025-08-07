using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace Practise.Models
{
    public class Bus
    {
        [Key]
        public int bus_id { get;set; }
        public string bus_name { get; set; }
        public int total_seats { get; set; }
        public string bus_type { get; set; }

        [JsonIgnore]
        public List<Schedules> schedules { get; set; }
    }
}
