namespace Practise.Controllers
{
    using Practise.Models;
    using System.Net;
    using System.Net.Mail;

    public static class Verification
    {
        public static void SendVerificationCode(string toEmail, string code)
        {
            // Gmail credentials
            string fromEmail = "abechehrah@gmail.com";  // replace with your Gmail
            string password = "lwdywkysanqsqngo";       // use Gmail App Password, not your normal password

            var smtpClient = new SmtpClient("smtp.gmail.com")
            {
                Port = 587,
                Credentials = new NetworkCredential(fromEmail, password),
                EnableSsl = true,
            };

            var mailMessage = new MailMessage
            {
                From = new MailAddress(fromEmail),
                Subject = "Your Verification Code",
                Body = $"Your signup verification code is: {code}",
                IsBodyHtml = false,
            };

            mailMessage.To.Add(toEmail);

            smtpClient.Send(mailMessage);
        }

        public static void SendTicket(string toEmail, Reservations reservation)
        {
            // Gmail credentials
            string fromEmail = "abechehrah@gmail.com";  // replace with your Gmail
            string password = "lwdywkysanqsqngo";       // use Gmail App Password, not your normal password

            var smtpClient = new SmtpClient("smtp.gmail.com")
            {
                Port = 587,
                Credentials = new NetworkCredential(fromEmail, password),
                EnableSsl = true,
            };

            var ticketDetails = $@"
                <h2>Your Ticket Reservation</h2>
                <p><strong>Hello:</strong> {reservation.name}</p>
                <p><strong>Reservation ID:</strong> {reservation.reservation_id}</p>
                <p><strong>Name:</strong> {reservation.name}</p>
                <p><strong>CNIC:</strong> {reservation.cinic}</p>
                <p><strong>Seats:</strong> {string.Join(", ", reservation.reservationsDetail.Select(d => d.seat_number))}</p>
                <p><strong>Total Seats:</strong> {reservation.total_seats}</p>
                <p><strong>Price per Seat:</strong> {reservation.price}</p>
                <p><strong>Total Price:</strong> {reservation.total_price}</p>
                <p><strong>Date:</strong> {reservation.reservation_date:dd-MM-yyyy HH:mm}</p>
                <p>Thank you for booking with us ❤</p>
";

            var mailMessage = new MailMessage
            {
                From = new MailAddress(fromEmail),
                Subject = "Your Ticket Reservation",
                Body = ticketDetails,
                IsBodyHtml = true,
            };

            mailMessage.To.Add(toEmail);

            smtpClient.Send(mailMessage);
        }
    }

}
