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
                    var checkexits = db.tbl_companies.Where(a => a.CompanyName.ToLower() == companydetails.CompanyName.ToLower() && a.IsActive == true && a.OrgID == SessionInfo.OrgID).FirstOrDefault();
                    if(checkexits !=null)
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
                    companyentity.ModifyDate = System.DateTime.Today.AddHours(5).ToShortDateString();
                    db.tbl_companies.InsertOnSubmit(companyentity);
                    db.SubmitChanges();
                    return Json("1", JsonRequestBehavior.AllowGet);

                }

            }catch(Exception ex)
            {
                return Json("0", JsonRequestBehavior.AllowGet);
            }
        }
    }
}