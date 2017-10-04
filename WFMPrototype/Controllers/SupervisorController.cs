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
        [CheckSession]
        public ActionResult Index()
        {
            return View();
        }
        [HttpPost]
        [CheckSession]
        public ActionResult AddSupervisor()
        {
            /* try
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
             } */

            string Result = string.Empty;
            string filename = string.Empty;
            tbl_supervisor supervisorentity = new tbl_supervisor();
            Random Rnumber = new Random();
            int randomnumber = Rnumber.Next(0, 99999);
            // Checking no of files injected in Request object  
            if (Request.Files.Count > 0)
            {
                try
                {
                    //  Get all files from Request object  
                    HttpFileCollectionBase files = Request.Files;
                    for (int i = 0; i < files.Count; i++)
                    {
                        //string path = AppDomain.CurrentDomain.BaseDirectory + "Uploads/";  
                        //string filename = Path.GetFileName(Request.Files[i].FileName);  

                        HttpPostedFileBase file = files[i];
                        string fname;

                        // Checking for Internet Explorer  
                        if (Request.Browser.Browser.ToUpper() == "IE" || Request.Browser.Browser.ToUpper() == "INTERNETEXPLORER")
                        {
                            string[] testfiles = file.FileName.Split(new char[] { '\\' });
                            fname = testfiles[testfiles.Length - 1];
                        }
                        else
                        {
                            fname = file.FileName;
                            filename = file.FileName;
                        }

                        // Get the complete folder path and store the file inside it.  
                        fname = Path.Combine(Server.MapPath("~/dist/img/supervisor"), randomnumber + fname);
                        file.SaveAs(fname);



                    }
                    // Returns message that successfully uploaded  

                }
                catch (Exception ex)
                {

                }
            }

            try
            {
                using (var db = new WFMLiveDataContext())
                {


                    if (Convert.ToInt32(Request.Form["Supervisorid"]) > 0)
                    {
                        int Supervisorid = Convert.ToInt32(Request.Form["Supervisorid"]);
                        tbl_supervisor Newentry = db.tbl_supervisors.Where(a => a.SupervisorID == Supervisorid).FirstOrDefault();
                        Newentry.FirstName = Convert.ToString(Request.Form["firstname"]);
                        Newentry.MiddleName = Convert.ToString(Request.Form["middlename"]);
                        Newentry.LastName = Convert.ToString(Request.Form["lastname"]);
                        Newentry.EmailID = Convert.ToString(Request.Form["email"]);
                        Newentry.Mobile = Convert.ToInt64(Request.Form["mobile"]);
                        Newentry.Password = Convert.ToString(Request.Form["password"]);
                        Newentry.ParmanentAddress = Convert.ToString(Request.Form["ParmanentAddress"]);
                        Newentry.CurrentAddress = Convert.ToString(Request.Form["currentaddress"]);
                        Newentry.Gender = Convert.ToString(Request.Form["gender"]);
                        Newentry.State = Convert.ToString(Request.Form["state"]);
                        Newentry.FatherName = Convert.ToString(Request.Form["father"]);
                        Newentry.City = Convert.ToString(Request.Form["city"]);
                        Newentry.ModifyBy = SessionInfo.Username;
                        Newentry.ModifyDate = System.DateTime.Now.AddDays(5).ToShortDateString();
                        Newentry.IsActive = true;
                        Newentry.OrgID = SessionInfo.OrgID;
                     
                        if (filename != "")
                          {
                            Newentry.IDProof = "/dist/img/supervisor/" + randomnumber + filename;
                        }

                        db.SubmitChanges();
                    }

                    else
                    {
                        supervisorentity.FirstName = Convert.ToString(Request.Form["firstname"]);
                        supervisorentity.MiddleName = Convert.ToString(Request.Form["middlename"]);
                        supervisorentity.LastName = Convert.ToString(Request.Form["lastname"]);
                        supervisorentity.EmailID = Convert.ToString(Request.Form["email"]);
                        supervisorentity.Mobile = Convert.ToInt64(Request.Form["mobile"]);
                        supervisorentity.Password =Convert.ToString(Request.Form["password"]);
                        supervisorentity.ParmanentAddress = Convert.ToString(Request.Form["ParmanentAddress"]);
                        supervisorentity.CurrentAddress = Convert.ToString(Request.Form["currentaddress"]);
                        supervisorentity.Gender = Convert.ToString(Request.Form["gender"]);
                        supervisorentity.State = Convert.ToString(Request.Form["state"]);
                        supervisorentity.FatherName = Convert.ToString(Request.Form["father"]);
                        supervisorentity.City = Convert.ToString(Request.Form["city"]);
                        supervisorentity.ModifyBy = SessionInfo.Username;
                        supervisorentity.ModifyDate = System.DateTime.Now.AddDays(5).ToShortDateString();
                        supervisorentity.IsActive = true;
                        supervisorentity.OrgID = SessionInfo.OrgID;
                        supervisorentity.IDProof = "/dist/img/supervisor/" + randomnumber + filename;
                        db.tbl_supervisors.InsertOnSubmit(supervisorentity);
                        db.SubmitChanges();
                    }
                    Result = "1";
                }
            }
            catch (Exception ex)
            {

            }


            return Json(Result);
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

        public JsonResult GetAllstates()
        {
            dynamic statslist = null;
            try
            {
                using (var db = new WFMLiveDataContext())
                {
                    statslist = db.tbl_states.ToList();
                }
            }
            catch (Exception ex)
            {

            }
            return Json(statslist, JsonRequestBehavior.AllowGet);
        }

        public JsonResult Citylistbyid(string statename)
        {
            dynamic citylist = null;
            try
            {
                using (var db = new WFMLiveDataContext())
                {
                    var satateid = db.tbl_states.Where(a => a.StateName == statename).FirstOrDefault();
                    int sid = satateid.StateID;

                    citylist = db.tbl_cities.Where(a => a.StateID == sid).ToList();
                }

            }
            catch (Exception ex)
            {

            }
            return Json(citylist, JsonRequestBehavior.AllowGet);
        }

        public JsonResult GetDetailbyid(int SupervisorID)
        {
            dynamic supervisordetails = null;
            try
            {
                using (var db = new WFMLiveDataContext())
                {
                    supervisordetails = db.tbl_supervisors.Where(a => a.SupervisorID == SupervisorID && a.OrgID == SessionInfo.OrgID).FirstOrDefault();
                }

            }
            catch (Exception ex)
            {

            }
            return Json(supervisordetails, JsonRequestBehavior.AllowGet);
        }
    }
}