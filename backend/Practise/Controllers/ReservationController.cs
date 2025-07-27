using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Practise.Data;
using Practise.DTO;
using Practise.Models;

namespace Practise.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class ReservationController : ControllerBase
    {
        public readonly AppDbContext _context;

        public ReservationController(AppDbContext context) { 
            _context = context; 
        }

        [HttpPost]

        public IActionResult makeReservation([FromBody] ReservationDTO model)
        {

            var reservation = new Reservations
            {
                user_id = model.user_id,
                name = model.name,
                email = model.email,
                cinic = model.cinic,
                reservation_date = model.reservation_date,
                total_price = model.total_price,
                schedule_id = model.schedule_id,
                reservationsDetail = new List<ReservationsDetail>() // initialize list
            };

            _context.reservations.Add(reservation);
             _context.SaveChanges(); // Save once to get reservation_id

            // Step 3: Add each seat detail with foreign key
            foreach (var detail in model.reservationDetail)
            {
                var reservationDetail = new ReservationsDetail
                {
                    reservation_id = reservation.reservation_id, // foreign ke y from saved parent
                    seat_number = detail.seat_number,
                    gender = detail.gender
                };
                _context.reservationsDetail.Add(reservationDetail);
            }

            // Step 4: Save seat details
            _context.SaveChanges();

            return Ok(new
            {
                message = "Reservation and seat details saved successfully",
                reservation_id = reservation.reservation_id
            });
        }
    }
}
