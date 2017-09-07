using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using WFMPrototype.DAL;
using WFMPrototype.Models;

namespace WFMPrototype.Controllers
{
    public class SupervisorController : Controller
    {
        // GET: Supervisor
        public ActionResult Index()
        {
            return View();
        }
        [HttpPost]
        [CheckSession]
        public ActionResult AddSupervisor(tbl_supervisor supervisordetails)
        {
            try
            {
                using (var db = new WFMLiveDataContext())
                {
                    var checkexist = db.tbl_supervisors.Where(a => a.EmailID.ToLower() == supervisordetails.EmailID.ToLower() && a.IsActive == true && a.OrgID == SessionInfo.OrgID).FirstOrDefault();
                    if (checkexist != null)
                    {
                        return Json("2", JsonRequestBehavior.AllowGet);
                    }
                    tbl_supervisor supervisorentity = new tbl_supervisor();
                    supervisorentity.FirstName = supervisordetails.FirstName;
                    supervisorentity.MiddleName = supervisordetails.MiddleName;
                    supervisorentity.LastName = supervisordetails.LastName;
                    supervisorentity.FatherName = supervisordetails.FatherName;
                    supervisorentity.EmailID = supervisordetails.EmailID;
                    supervisorentity.Password = supervisordetails.Password;
                    supervisorentity.Mobile = supervisordetails.Mobile;
                    supervisorentity.Gender = supervisordetails.Gender;
                    supervisorentity.State = supervisordetails.State;
                    supervisorentity.City = supervisordetails.City;
                    supervisorentity.ParmanentAddress = supervisordetails.ParmanentAddress;
                    supervisorentity.CurrentAddress = supervisordetails.CurrentAddress;
                    
                     /*   HttpFileCollectionBase files = Request.Files;
                        HttpPostedFileBase file = files[0];
                        string fname;
                        // Checking for Internet Explorer  
                        if (Request.Browser.Browser.ToUpper() == "IE" || Request.Browser.Browser.ToUpper() == "INTERNETEXPLORER")
                        {
                            string[] filess = file.FileName.Split(new char[] { '\\' });
                            fname = filess[filess.Length - 1];
                        }
                        else
                        {
                            fname = file.FileName;
                        }

                        // Get the complete folder path and store the file inside it.  
                        fname = Path.Combine(Server.MapPath("~/SupervisorIdProof"), fname);
                        file.SaveAs(fname);
                        // save data in table  */
                        supervisorentity.IDProof =supervisordetails.IDProof;
                    
                    supervisorentity.IsActive = true;
                    supervisorentity.OrgID =SessionInfo.OrgID;
                    supervisorentity.ModifyBy = SessionInfo.Username;
                    supervisorentity.ModifyDate = System.DateTime.Today.AddHours(5).ToShortDateString();
                    db.tbl_supervisors.InsertOnSubmit(supervisorentity);
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
        public ActionResult SupervisorList()
        {
            dynamic SupervisorList = null;
            try
            {
                using (var db = new WFMLiveDataContext())
                {

                    SupervisorList = db.tbl_supervisors.Where(a => a.IsActive == true && a.OrgID == SessionInfo.OrgID).ToList();

                }

            }

            catch (Exception ex)
            {

            }
            return Json(SupervisorList, JsonRequestBehavior.AllowGet);
        }

        [CheckSession]
        public ActionResult GetDataBySupervisorID(int SupervisorID)
        {
            dynamic SupervisorData = null;
            try
            {
                using (var db = new WFMLiveDataContext())
                {

                    SupervisorData = db.tbl_supervisors.Where(a => a.SupervisorID == SupervisorID && a.OrgID == SessionInfo.OrgID).FirstOrDefault();

                }

            }
            catch (Exception ex)
            {

            }
            return Json(SupervisorData, JsonRequestBehavior.AllowGet);
        }
        [HttpPost]
        [CheckSession]
        public void UpdateSupervisor(tbl_supervisor supervisordetails)
        {
            try
            {
                using (var db = new WFMLiveDataContext())
                {
                    tbl_supervisor supervisorentity = db.tbl_supervisors.Single(a => a.SupervisorID == supervisordetails.SupervisorID && a.OrgID == SessionInfo.OrgID);
                   
                    supervisorentity.FirstName = supervisordetails.FirstName;
                    supervisorentity.MiddleName = supervisordetails.MiddleName;
                    supervisorentity.LastName = supervisordetails.LastName;
                    supervisorentity.FatherName = supervisordetails.FatherName;
                    supervisorentity.EmailID = supervisordetails.EmailID;
                    supervisorentity.Password = supervisordetails.Password;
                    supervisorentity.Mobile = supervisordetails.Mobile;
                    supervisorentity.Gender = supervisordetails.Gender;
                    supervisorentity.State = supervisordetails.State;
                    supervisorentity.City = supervisordetails.City;
                    supervisorentity.ParmanentAddress = supervisordetails.ParmanentAddress;
                    supervisorentity.CurrentAddress = supervisordetails.CurrentAddress;
                    supervisorentity.IDProof = supervisordetails.IDProof;
                    supervisorentity.IsActive = true;
                    supervisorentity.OrgID = SessionInfo.OrgID;
                    supervisorentity.ModifyBy = SessionInfo.Username;
                    supervisorentity.ModifyDate = System.DateTime.Today.AddHours(5).ToShortDateString();                  
                    db.SubmitChanges();

                }

            }
            catch (Exception ex)
            {

            }
        }
        [CheckSession]
        public ActionResult RemoveSupervisor(int SupervisorID)
        {

            try
            {
                using (var db = new WFMLiveDataContext())
                {
                    tbl_supervisor Obj = new tbl_supervisor();
                    Obj = db.tbl_supervisors.Where(a => a.SupervisorID == SupervisorID && a.OrgID == SessionInfo.OrgID).FirstOrDefault();
                    Obj.IsActive = false;
                    db.SubmitChanges();

                }

            }
            catch (Exception ex)
            {

            }
            return Json("0", JsonRequestBehavior.AllowGet);
        }
    }
}