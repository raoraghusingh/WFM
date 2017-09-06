using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using WFMPrototype.Models;

namespace WFMPrototype.Controllers
{
    public class LoginController : Controller
    {
        // GET: Login
        public ActionResult Index()
        {

            return View();
        }


        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Index(LoginModel Objlogin)
        {

            if (Objlogin.Username == "superadmin@transpire.com" && Objlogin.Password == "123" && Objlogin.OrginizationID == 0)
            {
                Response.Cookies["OrgID"].Value = Convert.ToString(Objlogin.OrginizationID);
                Response.Cookies["Username"].Value = Objlogin.Username;
                return Redirect("Super-Admin-Dashboard");
            }
            if (Objlogin.Username == "surajkumarghosi@gmail.com" && Objlogin.Password == "123" && Objlogin.OrginizationID == 1)
            {
                Response.Cookies["OrgID"].Value = Convert.ToString(Objlogin.OrginizationID);
                Response.Cookies["Username"].Value = Objlogin.Username;
                return RedirectToAction("Index", "Dashboard");
            }
            else
            {
                ViewBag.errormsg = "Invalid username and password.";
            }

            return View();
        }
    }
}