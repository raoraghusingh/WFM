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
    public class OrganizationController : Controller
    {
        // GET: Organization
        [CheckSession]
        [Route("Manage-Organization")]
        public ActionResult Index()
        {
            return View();
        }

        [Route("Super-Admin-Dashboard")]
        public ActionResult Dashboard()
        {
            return View();
        }
        [HttpPost]
        [CheckSession]
        public ActionResult AddEditOrganization(tbl_organization organizationdetails, HttpPostedFileBase file)
        {
            if (file.ContentLength > 0)
            {
                var fileName = Path.GetFileName(file.FileName);
                var path = Path.Combine(Server.MapPath("~/UploadFile/"), fileName);
                file.SaveAs(path);
            }

            try
            {
                using (var db = new WFMLiveDataContext())
                {
                    if(organizationdetails.OrgID >0)
                    {
                        var checkexits = db.tbl_organizations.Where((a => a.OrganizationName.ToLower() == organizationdetails.OrganizationName.ToLower() || a.EmailID.ToLower() == organizationdetails.EmailID.ToLower() && a.IsActive == true)).ToList();
                        if (checkexits.Count>1)
                        {
                            return Json("2", JsonRequestBehavior.AllowGet);
                        }
                        tbl_organization organizationentity = db.tbl_organizations.Where(a => a.OrgID == organizationdetails.OrgID).FirstOrDefault();
                        organizationentity.OrganizationName = organizationdetails.OrganizationName;
                        organizationentity.FirstName = organizationdetails.FirstName;
                        organizationentity.MiddleName = organizationdetails.MiddleName;
                        organizationentity.LastName = organizationdetails.LastName;
                        organizationentity.Designation = organizationdetails.Designation;
                        organizationentity.EmailID = organizationdetails.EmailID;
                        organizationentity.Password = organizationdetails.Password;
                        organizationentity.Mobile = organizationdetails.Mobile;
                        organizationentity.Gender = organizationdetails.Gender;
                        organizationentity.State = organizationdetails.State;
                        organizationentity.City = organizationdetails.City;
                        //organizationentity.OrgID = SessionInfo.OrgID;
                        organizationentity.ModifyBy = SessionInfo.Username;
                        organizationentity.IsActive = true;
                        organizationentity.ModifyDate = System.DateTime.Today.AddHours(5).ToShortDateString();
                        
                        db.SubmitChanges();
                    }
                    else
                    {
                        var checkexits = db.tbl_organizations.Where((a => a.OrganizationName.ToLower() == organizationdetails.OrganizationName.ToLower() || a.EmailID.ToLower() == organizationdetails.EmailID.ToLower() && a.IsActive == true)).FirstOrDefault();
                        if (checkexits != null)
                        {
                            return Json("2", JsonRequestBehavior.AllowGet);
                        }
                        tbl_organization organizationentity = new tbl_organization();
                        organizationentity.OrganizationName = organizationdetails.OrganizationName;
                        organizationentity.FirstName = organizationdetails.FirstName;
                        organizationentity.MiddleName = organizationdetails.MiddleName;
                        organizationentity.LastName = organizationdetails.LastName;
                        organizationentity.Designation = organizationdetails.Designation;
                        organizationentity.EmailID = organizationdetails.EmailID;
                        organizationentity.Password = organizationdetails.Password;
                        organizationentity.Mobile = organizationdetails.Mobile;
                        organizationentity.Gender = organizationdetails.Gender;
                        organizationentity.State = organizationdetails.State;
                        organizationentity.City = organizationdetails.City;
                        //organizationentity.OrgID = SessionInfo.OrgID;
                        organizationentity.ModifyBy = SessionInfo.Username;
                        organizationentity.IsActive = true;
                        organizationentity.ModifyDate = System.DateTime.Today.AddHours(5).ToShortDateString();
                        db.tbl_organizations.InsertOnSubmit(organizationentity);
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
        public ActionResult OrgnizationList()
        {
            dynamic OrganizationList = null;
            try
            {
                using (var db = new WFMLiveDataContext())
                {

                    OrganizationList = db.tbl_organizations.Where(a => a.IsActive == true).ToList();

                }

            }
            catch (Exception ex)
            {
                
            }
            return Json(OrganizationList, JsonRequestBehavior.AllowGet);
        }

        [CheckSession]
        public ActionResult GetByOrgnizationListID(int ID)
        {
            dynamic OrganizationList = null;
            try
            {
                using (var db = new WFMLiveDataContext())
                {

                    OrganizationList = db.tbl_organizations.Where(a => a.IsActive == true && a.OrgID == ID).FirstOrDefault();

                }

            }
            catch (Exception ex)
            {

            }
            return Json(OrganizationList, JsonRequestBehavior.AllowGet);
        }


        [CheckSession]
        public ActionResult RemoveOrgnizationList(int ID)
        {
            
            try
            {
                using (var db = new WFMLiveDataContext())
                {
                    tbl_organization OrgDetails = new tbl_organization();
                    // OrganizationList = db.tbl_organizations.Where(a => a.IsActive == true && a.OrgID == ID).FirstOrDefault();
                    OrgDetails = db.tbl_organizations.Where(a => a.OrgID == ID).FirstOrDefault();
                    OrgDetails.IsActive = false;
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