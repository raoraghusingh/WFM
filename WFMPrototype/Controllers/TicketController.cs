using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Mail;
using System.Web;
using System.Web.Mvc;
using WFMPrototype.Models;
using WFMPrototype.DAL;

namespace WFMPrototype.Controllers
{
    public class TicketController : Controller
    {
        // GET: Ticket
        [CheckSession]
        public ActionResult Index()
        {
            return View();
        }

        [CheckSession]
        public JsonResult Allticket()
        {
            dynamic alllist = string.Empty;
            try
            {
                using (var db = new WFMLiveDataContext())
                {
                    alllist = db.tbl_tickets.Where(a => a.OrgID == SessionInfo.OrgID && (a.Status == 1 || a.Status == 2) && a.Type== "Complain").ToList();
                }

            }catch(Exception ex)
            {

            }

            return Json(alllist, JsonRequestBehavior.AllowGet);
        }
        [CheckSession]
        public void UpdateTicketstaus(int ticketid,int workerid,int statusid)
        {
            try
            {
                using (var db = new WFMLiveDataContext())
                {
                    tbl_ticket updatedata = db.tbl_tickets.Where(a => a.TicketID == ticketid).FirstOrDefault();
                    updatedata.AssignWorkerID = workerid;
                    updatedata.Status = statusid;
                    db.SubmitChanges();
                    // send mail for user
                    var fromAddress = new MailAddress("transpirebusinesssolutions@gmail.com", "Work Force Management");
                    var toAddress = new MailAddress(updatedata.Email, updatedata.Name);
                    const string fromPassword = "Effective1?";
                     string subject = "Acknowledgement :Ticket#" + updatedata.TicketID+"";
                    const string body = "Thank you for raising the ticket. we have assigned concern person for your ticket";

                    var smtp = new SmtpClient
                    {
                        Host = "smtp.gmail.com",
                        Port = 587,
                        EnableSsl = true,
                        DeliveryMethod = SmtpDeliveryMethod.Network,
                        UseDefaultCredentials = false,
                        Credentials = new NetworkCredential(fromAddress.Address, fromPassword)
                    };
                    using (var message = new MailMessage(fromAddress, toAddress)
                    {
                        Subject = subject,
                        Body = body
                    })
                    {
                        smtp.Send(message);
                    }
                    // end
                }
            }catch(Exception ex)
            {

            }

        }
        [CheckSession]
        public JsonResult loadAllresolvedTicket()
        {
            dynamic alllist = string.Empty;
            try
            {
                using (var db = new WFMLiveDataContext())
                {
                    alllist = (from tempticket in db.tbl_tickets
                               join tempworker in db.tbl_workers on tempticket.AssignWorkerID equals tempworker.WorkerID
                               where tempticket.Status == 3
                               select new { tempticket.TicketID,tempticket.CompanyName,tempticket.Email,tempticket.Mobile,tempticket.Name ,workername=tempworker.FirstName+" "+tempworker.MiddleName+" "+ tempworker.LastName,tempticket.Status}).ToList();//db.tbl_tickets.Where(a => a.OrgID == SessionInfo.OrgID && a.Status == 3).ToList();
                }

            }
            catch (Exception ex)
            {

            }

            return Json(alllist, JsonRequestBehavior.AllowGet);
        }
        
    }
}