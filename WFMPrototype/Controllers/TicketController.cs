using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using WFMPrototype.Models;

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
    }
}