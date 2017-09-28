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
        public ActionResult AssignWork(tbl_assignwork assignworkdetails,Array checklistobj,Array checklisttimeobj,Array checklistintervalobj)
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
                        tbl_assignwork assignworkentity = new tbl_assignwork();
                      //  assignworkentity.CompanyName = assignworkdetails.CompanyName;
                        assignworkentity.CompanyID = assignworkdetails.CompanyID;
                        assignworkentity.WorkerName = assignworkdetails.WorkerName;
                        assignworkentity.ShiftName = assignworkdetails.ShiftName;
                        assignworkentity.Checklist = Convert.ToString(checklistobj.GetValue(i));
                        assignworkentity.WorkTime = Convert.ToString(checklisttimeobj.GetValue(i));
                        assignworkentity.WorkInterVal = Convert.ToString(checklistintervalobj.GetValue(i));
                        assignworkentity.IsActive = true;
                        assignworkentity.OrgID = SessionInfo.OrgID;
                        assignworkentity.ModifyBy = SessionInfo.Username;
                        assignworkentity.ModifyDate = System.DateTime.Today.AddHours(5).ToShortDateString();
                        db.tbl_assignworks.InsertOnSubmit(assignworkentity);
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
        public ActionResult AssignedWorkList()
        {
            List<GetAssignedWorkDataResult> lst = new List<DAL.GetAssignedWorkDataResult>();
            try
            {
                using (var db = new WFMLiveDataContext())
                {
                    lst = db.GetAssignedWorkData(SessionInfo.OrgID).ToList();
                }

            }
            catch (Exception ex) { }

            return Json(lst, JsonRequestBehavior.AllowGet);
        }

        [CheckSession]
        public ActionResult GetDataByWorkerID(string WorkerID)
        {
            dynamic AssignedWorkData = null;
            try
            {
                using (var db = new WFMLiveDataContext())
                {

                    AssignedWorkData = db.tbl_assignworks.Where(a => a.WorkerName == WorkerID && a.OrgID == SessionInfo.OrgID).FirstOrDefault();

                }

            }
            catch (Exception ex)
            {

            }
            return Json(AssignedWorkData, JsonRequestBehavior.AllowGet);
        }
        [HttpPost]
        [CheckSession]
        public void UpdateAssignedWork(string WorkerID,tbl_assignwork assignworkdetails, Array checklistobj, Array checklisttimeobj, Array checklistintervalobj)
        {
            try
            {
                using (var db = new WFMLiveDataContext())
                {
                    tbl_assignwork Obj = new tbl_assignwork();
                    Obj = db.tbl_assignworks.Where(a => a.WorkerName == WorkerID && a.OrgID == SessionInfo.OrgID).First();
                    Obj.IsActive = false;
                    db.SubmitChanges();
                    /* tbl_assignwork supervisorentity = db.tbl_assignworks.Single(a => a.AssignWorkID == assignworkdetails.AssignWorkID && a.OrgID == SessionInfo.OrgID);
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
                     db.SubmitChanges(); */
                    for (int i = 0; i < checklistobj.Length; i++)
                    {
                        
                        tbl_assignwork assignworkentity = new tbl_assignwork();
                        //  assignworkentity.CompanyName = assignworkdetails.CompanyName;
                        assignworkentity.CompanyID = assignworkdetails.CompanyID;
                        assignworkentity.WorkerName = assignworkdetails.WorkerName;
                        assignworkentity.ShiftName = assignworkdetails.ShiftName;
                        assignworkentity.Checklist = Convert.ToString(checklistobj.GetValue(i));
                        assignworkentity.WorkTime = Convert.ToString(checklisttimeobj.GetValue(i));
                        assignworkentity.WorkInterVal = Convert.ToString(checklistintervalobj.GetValue(i));
                        assignworkentity.IsActive = true;
                        assignworkentity.OrgID = SessionInfo.OrgID;
                        assignworkentity.ModifyBy = SessionInfo.Username;
                        assignworkentity.ModifyDate = System.DateTime.Today.AddHours(5).ToShortDateString();
                        db.tbl_assignworks.InsertOnSubmit(assignworkentity);
                        db.SubmitChanges();
                    }

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
                                  select new { a.CompanyName,a.CompanyID };
                    CompanyList = Companies.AsEnumerable()
                          .Select(o => new tbl_company
                          {
                              CompanyName = o.CompanyName,
                              CompanyID=o.CompanyID
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
                                  select new { a.FirstName,a.WorkerID };
                    WorkerList = Workers.AsEnumerable()
                          .Select(o => new tbl_worker
                          {
                              FirstName= o.FirstName,
                              WorkerID=o.WorkerID
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
                                  select new { a.ShiftName,a.ShiftID };
                    ShiftList = Shifts.AsEnumerable()
                          .Select(o => new tbl_shift
                          {
                              ShiftName = o.ShiftName,
                              ShiftID=o.ShiftID
                          }).ToList();

                }

            }

            catch (Exception ex)
            {

            }
            return Json(ShiftList, JsonRequestBehavior.AllowGet);
        }
        [CheckSession]
        public ActionResult CheckList(int CompanyID,int ShiftID)
        {
            List<tbl_checklist> CheckList = new List<tbl_checklist>();

            try
            {
                using (var db = new WFMLiveDataContext())
                {
                    var checklists = from a in new WFMLiveDataContext().tbl_checklists
                                  where a.IsActive == true && a.OrgID == SessionInfo.OrgID && a.CompanyID==CompanyID && a.ShiftID==ShiftID
                                  select new { a.ChecklistID,a.WorkName,a.WorkInterval };
                    CheckList = checklists.AsEnumerable()
                          .Select(o => new tbl_checklist
                          {
                              ChecklistID = o.ChecklistID,
                              WorkName=o.WorkName,
                              WorkInterval=o.WorkInterval
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