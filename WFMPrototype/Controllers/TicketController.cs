﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace WFMPrototype.Controllers
{
    public class TicketController : Controller
    {
        // GET: Ticket
        public ActionResult Index()
        {
            return View();
        }
    }
}