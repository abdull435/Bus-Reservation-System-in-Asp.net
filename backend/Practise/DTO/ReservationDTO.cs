namespace Practise.DTO
{
    public class ReservationDTO
    {
        public int user_id { get; set; }
        public string name { get; set; }
        public string email { get; set; }
        public string cinic { get; set; }
        public DateTime reservation_date { get; set; }
        public decimal price { get; set; }
        public int total_seats { get; set; }
        public float total_price { get; set; }
        public int schedule_id { get; set; }
        public List<ReservationDetailDTO> reservationDetail { get; set; }
    }
}
