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
    public class WorkerController : Controller
    {
        // GET: Worker
        [CheckSession]
        public ActionResult Index()
        {
            return View();
        }

        [CheckSession]
        public ActionResult Addworker()
        {
            string Result = string.Empty;
            string filename = string.Empty;
            tbl_worker workeentity = new tbl_worker();
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
                        fname = Path.Combine(Server.MapPath("~/dist/img/worker"), randomnumber+fname);
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
                 

                    if (Convert.ToInt32(Request.Form["Workerid"]) > 0)
                    {
                        int Workerid = Convert.ToInt32(Request.Form["Workerid"]);
                        tbl_worker Newentry = db.tbl_workers.Where(a => a.WorkerID == Workerid).FirstOrDefault();
                        Newentry.FirstName = Convert.ToString(Request.Form["firstname"]);
                        Newentry.MiddleName = Convert.ToString(Request.Form["middlename"]);
                        Newentry.LastName = Convert.ToString(Request.Form["lastname"]);
                        Newentry.EmailID = Convert.ToString(Request.Form["email"]);
                        Newentry.Mobile = Convert.ToInt64(Request.Form["mobile"]);
                        Newentry.ParmanentAddress = Convert.ToString(Request.Form["paremanetaddress"]);
                        Newentry.CurrentAddress = Convert.ToString(Request.Form["currentaddress"]);
                        Newentry.Gender = Convert.ToString(Request.Form["gender"]);
                        Newentry.FatherName= Convert.ToString(Request.Form["father"]);
                        Newentry.State = Convert.ToString(Request.Form["state"]);
                        Newentry.City = Convert.ToString(Request.Form["city"]);
                        Newentry.ModifyBy = SessionInfo.Username;
                        Newentry.OrgID = SessionInfo.OrgID;
                        Newentry.ModifyDate = System.DateTime.Now.AddDays(5).ToShortDateString();
                        Newentry.IsActive = true;
                        if(filename !="")
                        {
                            Newentry.IDProof = "/dist/img/worker/" + randomnumber + filename;
                        }
                        
                        db.SubmitChanges();
                    }

                    else
                    {
                        workeentity.FirstName = Convert.ToString(Request.Form["firstname"]);
                        workeentity.MiddleName = Convert.ToString(Request.Form["middlename"]);
                        workeentity.LastName = Convert.ToString(Request.Form["lastname"]);
                        workeentity.EmailID = Convert.ToString(Request.Form["email"]);
                        workeentity.Mobile = Convert.ToInt64(Request.Form["mobile"]);
                        workeentity.ParmanentAddress = Convert.ToString(Request.Form["paremanetaddress"]);
                        workeentity.CurrentAddress = Convert.ToString(Request.Form["currentaddress"]);
                        workeentity.Gender = Convert.ToString(Request.Form["gender"]);
                        workeentity.State = Convert.ToString(Request.Form["state"]);
                        workeentity.FatherName = Convert.ToString(Request.Form["father"]);
                        workeentity.City = Convert.ToString(Request.Form["city"]);
                        workeentity.ModifyBy = SessionInfo.Username;
                        workeentity.ModifyDate = System.DateTime.Now.AddDays(5).ToShortDateString();
                        workeentity.IsActive = true;
                        workeentity.OrgID = SessionInfo.OrgID;
                        workeentity.IDProof = "/dist/img/worker/"+ randomnumber+filename;
                        db.tbl_workers.InsertOnSubmit(workeentity);
                        db.SubmitChanges();
                    }
                    Result = "1";
                }
            }
            catch(Exception ex)
            {

            }


            return Json(Result);

        }

        [CheckSession]
        public JsonResult WorkerList()
        {
            dynamic Activeworkerlist = null;
            try
            {
                using (var db = new WFMLiveDataContext())
                {
                    Activeworkerlist = db.tbl_workers.Where(a => a.OrgID == SessionInfo.OrgID && a.IsActive == true).ToList();
                }
            }catch(Exception ex)
            {

            }
            return Json(Activeworkerlist, JsonRequestBehavior.AllowGet);
        }

        public JsonResult GetDetailbyid(int workerid)
        {
            dynamic workerdetails = null;
            try
            {
                using (var db = new WFMLiveDataContext())
                {
                    workerdetails = db.tbl_workers.Where(a => a.WorkerID == workerid).FirstOrDefault();
                }

            }catch(Exception ex)
            {

            }
            return Json(workerdetails, JsonRequestBehavior.AllowGet);
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
            }catch(Exception ex)
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

            }catch(Exception ex)
            {

            }
            return Json(citylist, JsonRequestBehavior.AllowGet);
        }
    }
}