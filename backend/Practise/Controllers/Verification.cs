namespace Practise.Controllers
{
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
    }

}
