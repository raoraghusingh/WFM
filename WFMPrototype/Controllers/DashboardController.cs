using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using WFMPrototype.Models;

namespace WFMPrototype.Controllers
{
    public class DashboardController : Controller
    {
        // GET: Dashboard
        [CheckSession]
        public ActionResult Index()
        {
            return View();
        }

        public ActionResult Logout()
        {
           

            try
            {
                HttpCookie cookie = Request.Cookies["OrgID"];
                if (cookie != null)
                {
                    cookie.Expires = DateTime.Now.AddYears(-1);
                    Response.Cookies.Add(cookie);
                }
                HttpCookie cookie1 = Request.Cookies["Username"];
                if (cookie1 != null)
                {
                    cookie1.Expires = DateTime.Now.AddYears(-1);
                    Response.Cookies.Add(cookie1);
                }
            }

            catch (Exception ex)
            {

            }
            return RedirectToAction("index", "Login");
        }
    }
}