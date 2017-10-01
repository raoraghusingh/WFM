using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using WFMPrototype.DAL;
using WFMPrototype.Models;

namespace WFMPrototype.Controllers
{
    public class AssignSupervisorReportController : Controller
    {
        // GET: AssignSupervisorReport
        public ActionResult Index()
        {
            return View();
        }
        [CheckSession]
        public JsonResult AssignSupervisorList()
        {
            dynamic Alllist = string.Empty;
            try
            {
                using (var db = new WFMLiveDataContext())
                {
                    Alllist = (from ass in db.tbl_assignsupervisors
                               join temps in db.tbl_supervisors
                                on Convert.ToInt32(ass.SupervisorName) equals temps.SupervisorID
                               join tempc in db.tbl_companies on ass.CompanyID equals tempc.CompanyID
                               join tems in db.tbl_shifts on Convert.ToInt32(ass.ShiftName) equals tems.ShiftID
                               select new { Supervisorname = temps.FirstName + " " + temps.MiddleName + " " + temps.LastName, Companyname = tempc.CompanyName, Shiftname = tems.ShiftName, ass.AssignSupervisorID }).ToList();
                   
                }

            }
            catch (Exception ex)
            {

            }
            return Json(Alllist, JsonRequestBehavior.AllowGet);
        }
    }
}