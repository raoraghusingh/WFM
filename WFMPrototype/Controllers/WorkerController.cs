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
        public ActionResult Index()
        {
            return View();
        }

        public ActionResult Addworker()
        {
            string Result = string.Empty;
            string filename = string.Empty;
            tbl_worker workeentity = new tbl_worker();
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
                        fname = Path.Combine(Server.MapPath("~/dist/img/worker"), fname);
                        file.SaveAs(fname);
                        using (var db = new WFMLiveDataContext())
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
                            workeentity.City = Convert.ToString(Request.Form["city"]);
                            workeentity.ModifyBy = SessionInfo.Username;
                            workeentity.ModifyDate = System.DateTime.Now.AddDays(5).ToShortDateString();
                            workeentity.IsActive = true;
                            workeentity.IDProof = "/dist/img/worker" + filename;
                            db.tbl_workers.InsertOnSubmit(workeentity);
                            db.SubmitChanges();
                            Result = "1";
                        }
                       
                        
                    }
                    // Returns message that successfully uploaded  
                   
                }
                catch (Exception ex)
                {
                    
                }
            }
            return Json(Result);

        }
    }
}