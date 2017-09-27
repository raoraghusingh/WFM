using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using WFMPrototype.DAL;
using WFMPrototype.Models;

namespace WFMPrototype.Controllers
{
    public class DailyReportingController : Controller
    {
        // GET: DailyReporting
        public ActionResult Index()
        {
            return View();
        }

        [HttpPost]
        [CheckSession]
        public ActionResult DailyReporting(tbl_dailyreporting dailyreportingdetails, Array checklistobj)
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
                    for (int i = 0; i < checklistobj.Length; i++)
                    {
                        tbl_dailyreporting dailyreportingentity = new tbl_dailyreporting();
                        //  assignworkentity.CompanyName = assignworkdetails.CompanyName;
                        dailyreportingentity.CompanyID = dailyreportingdetails.CompanyID;
                        dailyreportingentity.WorkerName = dailyreportingdetails.WorkerName;
                        dailyreportingentity.ShiftName = dailyreportingdetails.ShiftName;
                        dailyreportingentity.Checklist = Convert.ToString(checklistobj.GetValue(i));
                        dailyreportingentity.Date = Convert.ToString(dailyreportingdetails.Date);

                        dailyreportingentity.IsActive = true;
                        dailyreportingentity.OrgID = SessionInfo.OrgID;
                        dailyreportingentity.ModifyBy = SessionInfo.Username;
                        dailyreportingentity.ModifyDate = System.DateTime.Today.AddHours(5).ToShortDateString();
                        db.tbl_dailyreportings.InsertOnSubmit(dailyreportingentity);
                        db.SubmitChanges();
                    }
                    return Json("1", JsonRequestBehavior.AllowGet);
                }

            }
            catch (Exception ex)
            {
                return Json("0", JsonRequestBehavior.AllowGet);
            }
        }

        [CheckSession]
        public ActionResult DailyReportingList()
        {
            dynamic DailyReportingList = null;
            try
            {
                using (var db = new WFMLiveDataContext())
                {

                    DailyReportingList = db.tbl_dailyreportings.Where(a => a.IsActive == true && a.OrgID == SessionInfo.OrgID).ToList();

                }

            }

            catch (Exception ex)
            {

            }
            return Json(DailyReportingList, JsonRequestBehavior.AllowGet);
        }

        [CheckSession]
        public ActionResult GetDataByDailyReportingID(int DailyReportingID)
        {
            dynamic DailyReportingData = null;
            try
            {
                using (var db = new WFMLiveDataContext())
                {

                    DailyReportingData = db.tbl_dailyreportings.Where(a => a.DailyReportingID == DailyReportingID && a.OrgID == SessionInfo.OrgID).FirstOrDefault();

                }

            }
            catch (Exception ex)
            {

            }
            return Json(DailyReportingData, JsonRequestBehavior.AllowGet);
        }
        [HttpPost]
        [CheckSession]
        public void UpdateDailyReporting(tbl_dailyreporting dailyreportingdetails)
        {
            try
            {
                using (var db = new WFMLiveDataContext())
                {
                    tbl_dailyreporting dailyreportingentity = db.tbl_dailyreportings.Single(a => a.DailyReportingID == dailyreportingdetails.DailyReportingID && a.OrgID == SessionInfo.OrgID);
              
                    dailyreportingentity.CompanyName = dailyreportingdetails.CompanyName;
                    dailyreportingentity.WorkerName = dailyreportingdetails.WorkerName;
                    dailyreportingentity.ShiftName = dailyreportingdetails.ShiftName;
                    dailyreportingentity.Checklist = dailyreportingdetails.Checklist;
                    dailyreportingentity.Date = dailyreportingdetails.Date;
                    dailyreportingentity.IsActive = true;
                    dailyreportingentity.OrgID = SessionInfo.OrgID;
                    dailyreportingentity.ModifyBy = SessionInfo.Username;
                    dailyreportingentity.ModifyDate = System.DateTime.Today.AddHours(5).ToShortDateString();
                    db.SubmitChanges();

                }

            }
            catch (Exception ex)
            {

            }
        }
        [CheckSession]
        public ActionResult RemoveDailyReporting(int DailyReportID)
        {

            try
            {
                using (var db = new WFMLiveDataContext())
                {
                    tbl_dailyreporting Obj = new tbl_dailyreporting();
                    Obj = db.tbl_dailyreportings.Where(a => a.DailyReportingID == DailyReportID && a.OrgID == SessionInfo.OrgID).FirstOrDefault();
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
                                  select new { a.FirstName, a.WorkerID };
                    WorkerList = Workers.AsEnumerable()
                          .Select(o => new tbl_worker
                          {
                              FirstName = o.FirstName,
                              WorkerID = o.WorkerID
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
                                 select new { a.ShiftName, a.ShiftID };
                    ShiftList = Shifts.AsEnumerable()
                          .Select(o => new tbl_shift
                          {
                              ShiftName = o.ShiftName,
                              ShiftID = o.ShiftID
                          }).ToList();

                }

            }

            catch (Exception ex)
            {

            }
            return Json(ShiftList, JsonRequestBehavior.AllowGet);
        }
        [CheckSession]
        public ActionResult CheckList(int CompanyID, int ShiftID)
        {
            List<tbl_checklist> CheckList = new List<tbl_checklist>();

            try
            {
                using (var db = new WFMLiveDataContext())
                {
                    var checklists = from a in new WFMLiveDataContext().tbl_checklists
                                     where a.IsActive == true && a.OrgID == SessionInfo.OrgID && a.CompanyID == CompanyID && a.ShiftID == ShiftID
                                     select new { a.ChecklistID, a.WorkName, a.WorkInterval };
                    CheckList = checklists.AsEnumerable()
                          .Select(o => new tbl_checklist
                          {
                              ChecklistID = o.ChecklistID,
                              WorkName = o.WorkName,
                              WorkInterval = o.WorkInterval
                          }).ToList();

                }

            }

            catch (Exception ex)
            {

            }
            return Json(CheckList, JsonRequestBehavior.AllowGet);
        }
    }
}