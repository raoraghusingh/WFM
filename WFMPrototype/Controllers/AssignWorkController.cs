using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using WFMPrototype.DAL;
using WFMPrototype.Models;

namespace WFMPrototype.Controllers
{
    public class AssignWorkController : Controller
    {
        // GET: AssignWork
        public ActionResult Index()
        {
            return View();
        }
        [HttpPost]
        [CheckSession]
        public ActionResult AssignWork(tbl_assignwork assignworkdetails)
        {
            try
            {
                using (var db = new WFMLiveDataContext())
                {
                    //var checkexist = db.tbl_supervisors.Where(a => a.EmailID.ToLower() == supervisordetails.EmailID.ToLower() && a.IsActive == true && a.OrgID == SessionInfo.OrgID).FirstOrDefault();
                    //if (checkexist != null)
                    //{
                    //    return Json("2", JsonRequestBehavior.AllowGet);
                    //}
                    tbl_assignwork assignworkentity = new tbl_assignwork();
                    assignworkentity.CompanyName = assignworkdetails.CompanyName;
                    assignworkentity.WorkerName = assignworkdetails.WorkerName;
                    assignworkentity.ShiftName = assignworkdetails.ShiftName;
                    assignworkentity.Checklist = assignworkdetails.Checklist;
                    assignworkentity.WorkInterVal = assignworkdetails.WorkInterVal;
                    assignworkentity.IsActive = true;
                    assignworkentity.OrgID = SessionInfo.OrgID;
                    assignworkentity.ModifyBy = SessionInfo.Username;
                    assignworkentity.ModifyDate = System.DateTime.Today.AddHours(5).ToShortDateString();
                    db.tbl_assignworks.InsertOnSubmit(assignworkentity);
                    db.SubmitChanges();
                    return Json("1", JsonRequestBehavior.AllowGet);

                }

            }
            catch (Exception ex)
            {
                return Json("0", JsonRequestBehavior.AllowGet);
            }
        }

        [CheckSession]
        public ActionResult AssignedWorkList()
        {
            dynamic AssignedWorkList = null;
            try
            {
                using (var db = new WFMLiveDataContext())
                {

                    AssignedWorkList = db.tbl_assignworks.Where(a => a.IsActive == true && a.OrgID == SessionInfo.OrgID).ToList();

                }

            }

            catch (Exception ex)
            {

            }
            return Json(AssignedWorkList, JsonRequestBehavior.AllowGet);
        }

        [CheckSession]
        public ActionResult GetDataByAssignWorkID(int AssignWorkID)
        {
            dynamic AssignedWorkData = null;
            try
            {
                using (var db = new WFMLiveDataContext())
                {

                    AssignedWorkData = db.tbl_assignworks.Where(a => a.AssignWorkID == AssignWorkID && a.OrgID == SessionInfo.OrgID).FirstOrDefault();

                }

            }
            catch (Exception ex)
            {

            }
            return Json(AssignedWorkData, JsonRequestBehavior.AllowGet);
        }
        [HttpPost]
        [CheckSession]
        public void UpdateAssignedWork(tbl_assignwork assignworkdetails)
        {
            try
            {
                using (var db = new WFMLiveDataContext())
                {
                    tbl_assignwork supervisorentity = db.tbl_assignworks.Single(a => a.AssignWorkID == assignworkdetails.AssignWorkID && a.OrgID == SessionInfo.OrgID);
                    tbl_assignwork assignworkentity = new tbl_assignwork();
                    assignworkentity.CompanyName = assignworkdetails.CompanyName;
                    assignworkentity.WorkerName = assignworkdetails.WorkerName;
                    assignworkentity.ShiftName = assignworkdetails.ShiftName;
                    assignworkentity.Checklist = assignworkdetails.Checklist;
                    assignworkentity.WorkInterVal = assignworkdetails.WorkInterVal;
                    assignworkentity.IsActive = true;
                    assignworkentity.OrgID = SessionInfo.OrgID;
                    assignworkentity.ModifyBy = SessionInfo.Username;
                    assignworkentity.ModifyDate = System.DateTime.Today.AddHours(5).ToShortDateString();
                    db.SubmitChanges();

                }

            }
            catch (Exception ex)
            {

            }
        }
        [CheckSession]
        public ActionResult RemoveAssignedWork(int AssignWorkID)
        {

            try
            {
                using (var db = new WFMLiveDataContext())
                {
                    tbl_assignwork Obj = new tbl_assignwork();
                    Obj = db.tbl_assignworks.Where(a => a.AssignWorkID == AssignWorkID && a.OrgID == SessionInfo.OrgID).FirstOrDefault();
                    Obj.IsActive = false;
                    db.SubmitChanges();

                }

            }
            catch (Exception ex)
            {

            }
            return Json("0", JsonRequestBehavior.AllowGet);
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
                                  select new { a.CompanyName };
                    CompanyList = Companies.AsEnumerable()
                          .Select(o => new tbl_company
                          {
                              CompanyName = o.CompanyName,
                          }).ToList();

                }

            }

            catch (Exception ex)
            {

            }
            return Json(CompanyList, JsonRequestBehavior.AllowGet);
        }
        [CheckSession]
        public ActionResult WorkerList()
        {
            List<tbl_worker> WorkerList = new List<tbl_worker>();

            try
            {
                using (var db = new WFMLiveDataContext())
                {
                    var Workers = from a in new WFMLiveDataContext().tbl_workers
                                  where a.IsActive == true && a.OrgID == SessionInfo.OrgID
                                  select new { a.FirstName };
                    WorkerList = Workers.AsEnumerable()
                          .Select(o => new tbl_worker
                          {
                              FirstName= o.FirstName,
                          }).ToList();

                }

            }

            catch (Exception ex)
            {

            }
            return Json(WorkerList, JsonRequestBehavior.AllowGet);
        }
        [CheckSession]
        public ActionResult ShiftList()
        {
            List<tbl_shift> ShiftList = new List<tbl_shift>();
            
            try
            {
                using (var db = new WFMLiveDataContext())
                {
                    var Shifts = from a in new WFMLiveDataContext().tbl_shifts
                                  where a.IsActive == true && a.OrgID == SessionInfo.OrgID
                                  select new { a.ShiftName };
                    ShiftList = Shifts.AsEnumerable()
                          .Select(o => new tbl_shift
                          {
                              ShiftName = o.ShiftName,
                          }).ToList();

                }

            }

            catch (Exception ex)
            {

            }
            return Json(ShiftList, JsonRequestBehavior.AllowGet);
        }

    }
}