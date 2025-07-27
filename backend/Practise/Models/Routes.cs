using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace Practise.Models
{
    public class Routes
    {
        [Key]
        public int route_id { get; set; }

        public string from_city { get; set; }

        public string to_city { get; set; }

        [JsonIgnore]  // 🔥 Prevents circular reference
        public List<Schedules> schedules { get; set; }

    }
}