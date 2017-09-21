using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using WFMPrototype.DAL;
using WFMPrototype.Models;

namespace WFMPrototype.Controllers
{
    public class ChecklistController : Controller
    {
        // GET: Checklist
        //[Route("Manage-Checklist")]
        public ActionResult Index()
        {



            //get shifttime list
           
            using (var db = new WFMLiveDataContext())
            {
                ViewBag.shiftlist = db.tbl_shifts.Where(a => a.OrgID == SessionInfo.OrgID && a.IsActive == true).ToList();

            }
                // end
                return View();
        }

        public JsonResult Addchecklist(CheckList checklistdetails)
        {
            dynamic CompanyList=null;
            try
            {
                using (var db = new WFMLiveDataContext())
                {
                    
                    foreach(var shift in checklistdetails.Shiftlist)
                    {
                        tbl_checklist checkentity = new tbl_checklist();
                        checkentity.OrgID = SessionInfo.OrgID;
                        checkentity.WorkName = checklistdetails.WorkName;
                        checkentity.WorkInterval = checklistdetails.WorkInterval;
                        checkentity.CompanyID = checklistdetails.CompanyID;
                        checkentity.ShiftID = Convert.ToInt32(shift);
                        db.tbl_checklists.InsertOnSubmit(checkentity);
                        db.SubmitChanges();
                    }
                    //CompanyList = db.tbl_companies.Where(a => a.OrgID == SessionInfo.OrgID && a.IsActive == true).ToList();
                }

            }catch(Exception ex)
            {

            }

            return Json(CompanyList, JsonRequestBehavior.AllowGet);

        }
    }
}