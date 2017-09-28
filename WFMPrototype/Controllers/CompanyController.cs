using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using WFMPrototype.DAL;
using WFMPrototype.Models;

namespace WFMPrototype.Controllers
{
    public class CompanyController : Controller
    {
        // GET: Company
        [CheckSession]
        public ActionResult Index()
        {
            return View();
        }

        [HttpPost]
        [CheckSession]
        public ActionResult AddEditCompany(tbl_company companydetails)
        {
            try
            {
                using (var db = new WFMLiveDataContext())
                {

                    if (companydetails.CompanyID > 0)
                    {
                        tbl_company companyentity = db.tbl_companies.Where(a => a.CompanyID == companydetails.CompanyID && a.CompanyName == companydetails.CompanyName).FirstOrDefault();
                        if (companyentity == null)
                        {
                            var checknameexits = db.tbl_companies.Where(a => a.CompanyName == companydetails.CompanyName || a.EmailID==companydetails.EmailID   && a.OrgID==SessionInfo.OrgID && a.IsActive==true).FirstOrDefault();
                            if(checknameexits !=null)
                            {
                                return Json("2", JsonRequestBehavior.AllowGet);
                            }
                        }
                        companyentity.CompanyName = companydetails.CompanyName;
                        companyentity.CompanyPhone = companydetails.CompanyPhone;
                        companyentity.CompanyAddress = companydetails.CompanyAddress;
                        companyentity.OwnerName = companydetails.OwnerName;
                        companyentity.EmailID = companydetails.EmailID;
                        companyentity.Password = companydetails.Password;
                        companyentity.OwnerMobile = companydetails.OwnerMobile;
                        companyentity.State = companydetails.State;
                        companyentity.City = companydetails.City;
                        companyentity.OrgID = SessionInfo.OrgID;
                        companyentity.ModifyBy = SessionInfo.Username;
                        companyentity.IsActive = true;
                        companyentity.ModifyDate = System.DateTime.Today.AddHours(5).ToShortDateString();
                        db.SubmitChanges();
                        return Json("3", JsonRequestBehavior.AllowGet);

                    }
                    else
                    { 

                        var checkexits = db.tbl_companies.Where(a => a.CompanyName.ToLower() == companydetails.CompanyName.ToLower() && a.IsActive == true && a.OrgID == SessionInfo.OrgID).FirstOrDefault();
                        if (checkexits != null)
                        {
                            return Json("2", JsonRequestBehavior.AllowGet);
                        }
                        tbl_company companyentity = new tbl_company();
                        companyentity.CompanyName = companydetails.CompanyName;
                        companyentity.CompanyPhone = companydetails.CompanyPhone;
                        companyentity.CompanyAddress = companydetails.CompanyAddress;
                        companyentity.OwnerName = companydetails.OwnerName;
                        companyentity.EmailID = companydetails.EmailID;
                        companyentity.Password = companydetails.Password;
                        companyentity.OwnerMobile = companydetails.OwnerMobile;
                        companyentity.State = companydetails.State;
                        companyentity.City = companydetails.City;
                        companyentity.OrgID = SessionInfo.OrgID;
                        companyentity.ModifyBy = SessionInfo.Username;
                        companyentity.IsActive = true;
                        companyentity.ModifyDate = System.DateTime.Today.AddHours(5).ToShortDateString();
                        db.tbl_companies.InsertOnSubmit(companyentity);
                        db.SubmitChanges();
                        return Json("1", JsonRequestBehavior.AllowGet);
                    }

                }

            }catch(Exception ex)
            {
                return Json("0", JsonRequestBehavior.AllowGet);
            }
        }


        [CheckSession]
        public JsonResult CompanyList()
        {
            dynamic companylist = null;
            try
            {
                using (var db = new WFMLiveDataContext())
                {
                    companylist = db.tbl_companies.Where(a => a.IsActive == true && a.OrgID == SessionInfo.OrgID).ToList();
                }

            }catch(Exception ex)
            {

            }
            return Json(companylist, JsonRequestBehavior.AllowGet);
        }

        [CheckSession]
        public JsonResult GetCompanyByID(int ID)
        {
            dynamic Companydetails = null;
            try
            {
                using (var db = new WFMLiveDataContext())
                {
                    Companydetails = db.tbl_companies.Where(a => a.IsActive == true && a.OrgID == SessionInfo.OrgID && a.CompanyID == ID).FirstOrDefault();
                }

            }
            catch (Exception ex)
            {

            }
            return Json(Companydetails, JsonRequestBehavior.AllowGet);
        }

        public string  Removecompany(int ID)
        {
            string Result = string.Empty;
            try
            {
                using (var db = new WFMLiveDataContext())
                {
                    db.Deactivecompany(ID, SessionInfo.OrgID);
                    Result = "1";
                }

            }catch(Exception ex)
            {
                Result = "0";
            }

            return Result;
        }
    }
}