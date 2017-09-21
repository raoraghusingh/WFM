using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using WFMPrototype.DAL;
using WFMPrototype.Models;

namespace WFMPrototype.Controllers
{
    public class TicketFeedbackController : Controller
    {
        // GET: TicketFeedback
        public ActionResult Index()
        {
            return View();
        }
        [HttpPost]
        [CheckSession]
        public ActionResult AddTicketFeedback(tbl_ticket TicketFeedbackdetails)
        {
            try
            {
                using (var db = new WFMLiveDataContext())
                {
                    
                    tbl_ticket ticketfeedbackentity = new tbl_ticket();
                    ticketfeedbackentity.CompanyName = TicketFeedbackdetails.CompanyName;
                    ticketfeedbackentity.CompanyEmail = TicketFeedbackdetails.CompanyEmail;
                    ticketfeedbackentity.Name = TicketFeedbackdetails.Name;
                    ticketfeedbackentity.Email = TicketFeedbackdetails.Email;
                    ticketfeedbackentity.Mobile = TicketFeedbackdetails.Mobile;
                    ticketfeedbackentity.Type = TicketFeedbackdetails.Type;
                    ticketfeedbackentity.Ccomments = TicketFeedbackdetails.Ccomments;
                    ticketfeedbackentity.Image = TicketFeedbackdetails.Image;

                    /*   HttpFileCollectionBase files = Request.Files;
                       HttpPostedFileBase file = files[0];
                       string fname;
                       // Checking for Internet Explorer  
                       if (Request.Browser.Browser.ToUpper() == "IE" || Request.Browser.Browser.ToUpper() == "INTERNETEXPLORER")
                       {
                           string[] filess = file.FileName.Split(new char[] { '\\' });
                           fname = filess[filess.Length - 1];
                       }
                       else
                       {
                           fname = file.FileName;
                       }

                       // Get the complete folder path and store the file inside it.  
                       fname = Path.Combine(Server.MapPath("~/SupervisorIdProof"), fname);
                       file.SaveAs(fname);
                       // save data in table  */

                    ticketfeedbackentity.IsActive = true;
                    ticketfeedbackentity.OrgID = SessionInfo.OrgID;
                    ticketfeedbackentity.ModifyBy = SessionInfo.Username;
                    ticketfeedbackentity.ModifyDate = System.DateTime.Today.AddHours(5).ToShortDateString();
                    db.tbl_tickets.InsertOnSubmit(ticketfeedbackentity);
                    db.SubmitChanges();
                    return Json("1", JsonRequestBehavior.AllowGet);

                }

            }
            catch (Exception ex)
            {
                return Json("0", JsonRequestBehavior.AllowGet);
            }
        }
    }
}