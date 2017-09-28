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
        [CheckSession]
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
           
            try
            {
                using (var db = new WFMLiveDataContext())
                {
                    if (checklistdetails.ChecklistID > 0)
                    {
                        var previoursworksname = db.tbl_checklists.Where(a => a.OrgID == SessionInfo.OrgID && a.ChecklistID == checklistdetails.ChecklistID && a.WorkName==checklistdetails.WorkName).FirstOrDefault();

                        if (previoursworksname == null)
                        {
                            var chekcworknameexits = db.tbl_checklists.Where(a => a.OrgID == SessionInfo.OrgID && a.WorkName.Trim().ToLower() == checklistdetails.WorkName.ToLower() && a.CompanyID == checklistdetails.CompanyID).FirstOrDefault();
                            if (chekcworknameexits != null)
                            {
                                return Json("2", JsonRequestBehavior.AllowGet);
                            }
                        }
                        var pname = db.tbl_checklists.Where(a => a.OrgID == SessionInfo.OrgID && a.ChecklistID == checklistdetails.ChecklistID ).FirstOrDefault();

                        List<tbl_checklist> oldentiry = db.tbl_checklists.Where(a => a.WorkName == pname.WorkName).ToList();

                        for(int i=0;i<oldentiry.Count;i++)
                        {
                            oldentiry[i].IsActive = false;
                            db.SubmitChanges();
                            foreach (var shift in checklistdetails.Shiftlist)
                            {
                                if (oldentiry[i].ShiftID == Convert.ToInt32(shift))
                                {
                                    oldentiry[i].WorkName = checklistdetails.WorkName;
                                    oldentiry[i].CompanyID = checklistdetails.CompanyID;
                                    oldentiry[i].WorkInterval = checklistdetails.WorkInterval;
                                     oldentiry[i].IsActive = true;
                                    db.SubmitChanges();
                                    
                                }

                                var checkentiryextisornot = oldentiry.Where(a => a.ShiftID == Convert.ToInt32(shift)).FirstOrDefault();
                                if (checkentiryextisornot == null)
                                {
                                    tbl_checklist newentry = new tbl_checklist();
                                    newentry.WorkName = checklistdetails.WorkName;
                                    newentry.CompanyID = checklistdetails.CompanyID;
                                    newentry.WorkInterval = checklistdetails.WorkInterval;
                                    newentry.OrgID = SessionInfo.OrgID;
                                    newentry.ShiftID = Convert.ToInt32(shift);
                                    newentry.IsActive = true;
                                    db.tbl_checklists.InsertOnSubmit(newentry);
                                    db.SubmitChanges();
                                }

                            }
                        }


                        foreach (var checkentity in db.tbl_checklists.Where(a => a.WorkName==pname.WorkName).ToList())
                        {
                            
                        }


                    }
                    else
                    {


                        var chekcworknameexits = db.tbl_checklists.Where(a => a.OrgID == SessionInfo.OrgID && a.WorkName.Trim().ToLower() == checklistdetails.WorkName.ToLower() && a.CompanyID == checklistdetails.CompanyID).FirstOrDefault();
                        if (chekcworknameexits != null)
                        {
                            return Json("2", JsonRequestBehavior.AllowGet);
                        }

                        foreach (var shift in checklistdetails.Shiftlist)
                        {

                            tbl_checklist checkentity = new tbl_checklist();
                            checkentity.OrgID = SessionInfo.OrgID;
                            checkentity.WorkName = checklistdetails.WorkName;
                            checkentity.WorkInterval = checklistdetails.WorkInterval;
                            checkentity.CompanyID = checklistdetails.CompanyID;
                            checkentity.ShiftID = Convert.ToInt32(shift);
                            checkentity.IsActive = true;
                            db.tbl_checklists.InsertOnSubmit(checkentity);
                            db.SubmitChanges();
                        }
                        //CompanyList = db.tbl_companies.Where(a => a.OrgID == SessionInfo.OrgID && a.IsActive == true).ToList();
                    }
                }
                

            }catch(Exception ex)
            {

            }

            return Json("1", JsonRequestBehavior.AllowGet);

        }


        public JsonResult Createchecklist()
        {
            dynamic checklist = null;
            try
            {
                using (var db = new WFMLiveDataContext())
                {
                    checklist = (from tempchcklist in db.tbl_checklists
                                 join temcom in db.tbl_companies on tempchcklist.CompanyID equals temcom.CompanyID
                                 join tempshift in db.tbl_shifts on tempchcklist.ShiftID equals tempshift.ShiftID where tempchcklist.OrgID==SessionInfo.OrgID && tempchcklist.IsActive==true
                                 select new { checklistid=tempchcklist.ChecklistID,companyid=temcom.CompanyID,shiftid=tempshift.ShiftID,shiftstarttime=tempshift.StartTime,shiftendtime=tempshift.EndTime, companyname=temcom.CompanyName,workname=tempchcklist.WorkName,workinterval=tempchcklist.WorkInterval,shiftname=tempshift.ShiftName }).ToList().OrderBy(a=>a.workname);
                                 //db.tbl_checklists.Where(a => a.OrgID == SessionInfo.OrgID && a.IsActive == true).ToList();
                }
            }catch(Exception ex)
            {

            }
            return Json(checklist, JsonRequestBehavior.AllowGet);
        }


        public JsonResult GetWorkdetailbyname(string workname,int companyid)
        {
            dynamic workdeails = string.Empty;
            try
            {
                using (var db = new WFMLiveDataContext())
                {
                    workdeails = db.tbl_checklists.Where(a => a.CompanyID == companyid && a.OrgID == SessionInfo.OrgID && a.WorkName == workname && a.IsActive==true).ToList();
                }
            }
            catch(Exception ex)
            {

            }
            return Json(workdeails, JsonRequestBehavior.AllowGet);
        }
    }
}