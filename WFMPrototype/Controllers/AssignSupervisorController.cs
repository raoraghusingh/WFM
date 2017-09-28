using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using WFMPrototype.DAL;
using WFMPrototype.Models;

namespace WFMPrototype.Controllers
{
    public class AssignSupervisorController : Controller
    {
        // GET: AssignSupervisor
        [CheckSession]
        public ActionResult Index()
        {
           
            return View();
        }

        [CheckSession]
        public JsonResult loadshift()
        {
            dynamic loadhisft = string.Empty;
            try
            {
                using (var db = new WFMLiveDataContext())
                {
                    loadhisft = db.tbl_shifts.Where(a => a.OrgID == SessionInfo.OrgID && a.IsActive == true).ToList();

                }
            }
            catch(Exception ex)
            {

            }
            return Json(loadhisft, JsonRequestBehavior.AllowGet);
        }

        [CheckSession]
        public JsonResult AssignNewSupervisor(tbl_assignsupervisor assignsupervisordetails)
        {
            try
            {
                using (var db = new WFMLiveDataContext())
                {




                    if (assignsupervisordetails.AssignSupervisorID > 0)
                    {

                        var chekcsupervisorchange = db.tbl_assignsupervisors.Where(a => a.CompanyID == assignsupervisordetails.CompanyID && a.SupervisorName == assignsupervisordetails.SupervisorName && a.AssignSupervisorID==assignsupervisordetails.AssignSupervisorID).FirstOrDefault();
                        if(chekcsupervisorchange ==null)
                        {
                            var checkalreadyexitsornot = db.tbl_assignsupervisors.Where(a => a.CompanyID == assignsupervisordetails.CompanyID && a.SupervisorName == assignsupervisordetails.SupervisorName && a.IsActive == true).FirstOrDefault();
                            if (checkalreadyexitsornot != null)
                            {
                                return Json("2", JsonRequestBehavior.AllowGet);
                            }
                        }

                        tbl_assignsupervisor udpateentiry = db.tbl_assignsupervisors.Where(a => a.AssignSupervisorID == assignsupervisordetails.AssignSupervisorID).FirstOrDefault();
                        udpateentiry.SupervisorName = assignsupervisordetails.SupervisorName;
                        udpateentiry.ShiftName = assignsupervisordetails.ShiftName;
                        udpateentiry.CompanyID = assignsupervisordetails.CompanyID;
                        udpateentiry.IsActive = true;
                        udpateentiry.OrgID = SessionInfo.OrgID;
                        db.SubmitChanges();

                    }
                    else
                    {
                        var checkalreadyexitsornot = db.tbl_assignsupervisors.Where(a => a.CompanyID == assignsupervisordetails.CompanyID && a.SupervisorName == assignsupervisordetails.SupervisorName && a.IsActive == true).FirstOrDefault();
                        if(checkalreadyexitsornot !=null)
                        {
                            return Json("2", JsonRequestBehavior.AllowGet);
                        }

                        tbl_assignsupervisor newentiry = new tbl_assignsupervisor();
                        newentiry.SupervisorName = assignsupervisordetails.SupervisorName;
                        newentiry.ShiftName = assignsupervisordetails.ShiftName;
                        newentiry.CompanyID = assignsupervisordetails.CompanyID;
                        newentiry.IsActive = true;
                        newentiry.OrgID = SessionInfo.OrgID;
                        db.tbl_assignsupervisors.InsertOnSubmit(newentiry);
                        db.SubmitChanges();
                    }
                }
            }catch(Exception ex)
            {

            }
            return Json("1", JsonRequestBehavior.AllowGet);
        }

        [CheckSession]
        public JsonResult Getdetialsbyid(int assignsupervisorid)
        {
            dynamic details = string.Empty;
            try
            {
                using (var db = new WFMLiveDataContext())
                {
                    details = db.tbl_assignsupervisors.Where(a => a.AssignSupervisorID == assignsupervisorid && a.OrgID == SessionInfo.OrgID).FirstOrDefault();
                }
                
            }catch(Exception ex)
            {

            }
            return Json(details, JsonRequestBehavior.AllowGet);
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
                               select new { Supervisorname=temps.FirstName+" "+temps.MiddleName+" "+temps.LastName, Companyname=tempc.CompanyName, Shiftname=tems.ShiftName , ass.AssignSupervisorID}).ToList();
                    //db.tbl_assignsupervisors.Where(a => a.OrgID == SessionInfo.OrgID && a.IsActive == true).ToList();
                }

            }
            catch (Exception ex)
            {

            }
            return Json(Alllist, JsonRequestBehavior.AllowGet);
        }


    }
}