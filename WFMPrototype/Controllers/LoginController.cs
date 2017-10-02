using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using WFMPrototype.DAL;
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

            if (Objlogin.Username == "superadmin@transpiregs.com" && Objlogin.Password == "123456" && Objlogin.OrginizationID == 0)
            {
                Response.Cookies["OrgID"].Value = Convert.ToString(Objlogin.OrginizationID);
                Response.Cookies["Username"].Value = Objlogin.Username;
                return Redirect("Super-Admin-Dashboard");
            }


            dynamic checkuser = string.Empty;
                        if (Objlogin.rolid == 2)
                            {
                                using (var db = new WFMLiveDataContext())
                                    {
                    checkuser = db.tbl_organizations.Where(a => a.EmailID == Objlogin.Username && a.Password == Objlogin.Password && a.OrgID == Objlogin.OrginizationID).FirstOrDefault();
                                    }
                            }
            if (Objlogin.rolid == 4)
            {
                using (var db = new WFMLiveDataContext())
                {
                    checkuser = db.tbl_companies.Where(a => a.EmailID == Objlogin.Username && a.Password == Objlogin.Password && a.OrgID == Objlogin.OrginizationID).FirstOrDefault();
                }
            }
            if (Objlogin.rolid == 3)
                            {
                                using (var db = new WFMLiveDataContext())
                                    {
                    checkuser = db.tbl_supervisors.Where(a => a.EmailID == Objlogin.Username && a.Password == Objlogin.Password && a.OrgID == Objlogin.OrginizationID).FirstOrDefault();
                                    }
                         }
            
                        if (checkuser != null)
                            {
                Response.Cookies["OrgID"].Value = Convert.ToString(Objlogin.OrginizationID);
                Response.Cookies["Username"].Value = Objlogin.Username;
                Response.Cookies["RoleID"].Value = Convert.ToString(Objlogin.rolid);
                
                                return RedirectToAction("Index", "Dashboard");
                            }
                        else
            {
                ViewBag.errormsg = "Invalid username or password.";
                           }
            

            return View();
        }
    }
}