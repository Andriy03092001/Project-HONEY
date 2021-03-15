using System.Threading.Tasks;
using SendGrid.Helpers.Mail;
using System;
using SendGrid;
using System.Net.Mail;
using System.Net;

namespace ProjectHONEY.Helper
{
    public class EmailService
    {
        public async Task SendEmailAsync(string email, string subject, string message)
        {
            var apiKey = "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";
            var client = new SendGridClient(apiKey);
            var from = new EmailAddress("cuanid236316@gmail.com", "Andriy236316");
            var to = new EmailAddress("nastia236316@gmail.com", "Nastia");
            var plainTextContent = "";
            var msg = MailHelper.CreateSingleEmail(from, to, subject, plainTextContent, message);
            var response = await client.SendEmailAsync(msg);
        }
    }
}
