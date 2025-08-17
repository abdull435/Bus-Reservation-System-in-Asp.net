using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
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
            try
            {
                DateTime utcTime = DateTime.UtcNow;

                TimeZoneInfo pakistanTimeZone = TimeZoneInfo.FindSystemTimeZoneById("Pakistan Standard Time");
                DateTime pakistanTime = TimeZoneInfo.ConvertTimeFromUtc(utcTime, pakistanTimeZone);
                DateTime todayDate = pakistanTime.Date;

                var checkReservation = _context.reservations.Count(r => r.email == model.email
                && r.reservation_date.Date == todayDate);

                if (checkReservation >= 4)
                {
                    return BadRequest(new { success = false, message = "Maximum 4 reservations allowed in a day." });
                }

                if(model.total_seats > 4)
                {
                    return BadRequest(new { success = false, message = "Maximum 4 seats allowed to reserve." });
                }

                var requestedSeats = model.reservationDetail.Select(d => d.seat_number).ToList();

                var alreadyReservedSeats = _context.reservations
                    .Include(r => r.reservationsDetail)
                    .Where(r => r.schedule_id == model.schedule_id)
                    .SelectMany(r => r.reservationsDetail)
                    .Where(d => requestedSeats.Contains(d.seat_number))
                    .Select(d => d.seat_number)
                    .ToList();

                if (alreadyReservedSeats.Any())
                {
                    return BadRequest(new { success = false, message = $"Seats already reserved: {string.Join(", ", alreadyReservedSeats)}" });
                }

                var reservation = new Reservations
                {
                    user_id = model.user_id,
                    name = model.name,
                    email = model.email,
                    cinic = model.cinic,
                    reservation_date = pakistanTime,
                    price = model.price,
                    total_seats = model.total_seats,
                    total_price = model.total_price,
                    schedule_id = model.schedule_id,
                    reservationsDetail = new List<ReservationsDetail>()
                };

                _context.reservations.Add(reservation);
                _context.SaveChanges();

                foreach (var detail in model.reservationDetail)
                {
                    var reservationDetail = new ReservationsDetail
                    {
                        reservation_id = reservation.reservation_id,
                        seat_number = detail.seat_number,
                        gender = detail.gender
                    };
                    _context.reservationsDetail.Add(reservationDetail);
                }

                _context.SaveChanges();


                var schedule = _context.schedules.FirstOrDefault(s => s.schedule_id == model.schedule_id);
                if (schedule != null)
                {
                    schedule.available_seats -= model.reservationDetail.Count;
                    _context.schedules.Update(schedule);
                    _context.SaveChanges();
                }

                return Ok(new
                {
                    message = "Reservation and seat details saved successfully",
                    reservation_id = reservation.reservation_id,
                });
            }
            catch (DbUpdateException dbEx)
            {
                return StatusCode(500, new { success = false, message = "Database error occurred", error = dbEx.InnerException?.Message });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { success = false, message = "An unexpected error occurred", error = ex.Message });
            }
        }

        [HttpGet("get-reservations/{user_id}")]
        public IActionResult getReservations(int user_id)
        {
            try
            {
                var reservation = _context.reservations.Where(u => u.user_id == user_id)
                    .Include(s => s.schedule).ThenInclude(r => r.routes).ToList();

                return Ok(new { reservation });
            }
            catch (DbUpdateException dbEx)
            {
                return StatusCode(500, new { success = false, message = "Database error occurred", error = dbEx.InnerException?.Message });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { success = false, message = "An unexpected error occurred", error = ex.Message });
            }
        }
    }
}
