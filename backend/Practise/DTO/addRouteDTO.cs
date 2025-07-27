using System.ComponentModel.DataAnnotations;

namespace Practise.DTO
{
    public class addRouteDTO
    {
        [Key]
        public int route_id { get; set; }

        public string from_city { get; set; }

        public string to_city { get; set; }
    }
}
