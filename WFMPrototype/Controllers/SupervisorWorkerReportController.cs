using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using WFMPrototype.DAL;
using WFMPrototype.Models;

namespace WFMPrototype.Controllers
{
    public class SupervisorWorkerReportController : Controller
    {
        // GET: SupervisorWorkerReport
        public ActionResult Index()
        {
            return View();
        }
        [CheckSession]
        public ActionResult CompanyList()
        {
            List<tbl_company> CompanyList = new List<tbl_company>();

            try
            {
                using (var db = new WFMLiveDataContext())
                {
                    var Companies = from a in new WFMLiveDataContext().tbl_companies
                                    where a.IsActive == true && a.OrgID == SessionInfo.OrgID
                                    select new { a.CompanyName, a.CompanyID };
                    CompanyList = Companies.AsEnumerable()
                          .Select(o => new tbl_company
                          {
                              CompanyName = o.CompanyName,
                              CompanyID = o.CompanyID
                          }).ToList();

                }

            }

            catch (Exception ex)
            {

            }
            return Json(CompanyList, JsonRequestBehavior.AllowGet);
        }
    }
}