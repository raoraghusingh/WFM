using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using WFMPrototype.DAL;
using WFMPrototype.Models;

namespace WFMPrototype.Controllers
{
    public class LostFoundController : Controller
    {
        // GET: LostFound
        public ActionResult Index()
        {
            return View();
        }
        [HttpPost]
        [CheckSession]
        public ActionResult AddLostFound(tbl_lostfound lostfounddetails)
        {
            try
            {
                using (var db = new WFMLiveDataContext())
                {
                    
                    tbl_lostfound lostfoundentity = new tbl_lostfound();
                    lostfoundentity.CompanyID = lostfounddetails.CompanyID;
                    lostfoundentity.FounderName = lostfounddetails.FounderName;
                    lostfoundentity.ItemName = lostfounddetails.ItemName;
                    lostfoundentity.Comments = lostfounddetails.Comments;
                    lostfoundentity.Date = lostfounddetails.Date;
                    lostfoundentity.IsActive = true;
                    lostfoundentity.OrgID = SessionInfo.OrgID;
                    lostfoundentity.ModifyBy = SessionInfo.Username;
                    lostfoundentity.ModifyDate = System.DateTime.Today.AddHours(5).ToShortDateString();
                    db.tbl_lostfounds.InsertOnSubmit(lostfoundentity);
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
        public ActionResult LostFoundList()
        {
            dynamic LostFoundList = null;
            try
            {
                using (var db = new WFMLiveDataContext())
                {

                    LostFoundList = db.tbl_lostfounds.Where(a => a.IsActive == true && a.OrgID == SessionInfo.OrgID).ToList();

                }

            }

            catch (Exception ex)
            {

            }
            return Json(LostFoundList, JsonRequestBehavior.AllowGet);
        }

        [CheckSession]
        public ActionResult GetDataByLostFoundID(int LostFoundID)
        {
            dynamic LostFoundData = null;
            try
            {
                using (var db = new WFMLiveDataContext())
                {

                    LostFoundData = db.tbl_lostfounds.Where(a => a.LostFoundID == LostFoundID && a.OrgID == SessionInfo.OrgID).FirstOrDefault();

                }

            }
            catch (Exception ex)
            {

            }
            return Json(LostFoundData, JsonRequestBehavior.AllowGet);
        }
        [HttpPost]
        [CheckSession]
        public void UpdateLostFound(tbl_lostfound lostfounddetails)
        {
            try
            {
                using (var db = new WFMLiveDataContext())
                {
                    tbl_lostfound lostfoundentity = db.tbl_lostfounds.Single(a => a.LostFoundID == lostfounddetails.LostFoundID && a.OrgID == SessionInfo.OrgID);

                    lostfoundentity.CompanyID = lostfounddetails.CompanyID;
                    lostfoundentity.FounderName = lostfounddetails.FounderName;
                    lostfoundentity.ItemName = lostfounddetails.ItemName;
                    lostfoundentity.Comments = lostfounddetails.Comments;
                    lostfoundentity.Date = lostfounddetails.Date;
                    lostfoundentity.IsActive = true;
                    lostfoundentity.OrgID = SessionInfo.OrgID;
                    lostfoundentity.ModifyBy = SessionInfo.Username;
                    lostfoundentity.ModifyDate = System.DateTime.Today.AddHours(5).ToShortDateString();
                    db.SubmitChanges();

                }

            }
            catch (Exception ex)
            {

            }
        }
        [CheckSession]
        public ActionResult RemoveLostFound(int LostFoundID)
        {

            try
            {
                using (var db = new WFMLiveDataContext())
                {
                    tbl_lostfound Obj = new tbl_lostfound();
                    Obj = db.tbl_lostfounds.Where(a => a.LostFoundID == LostFoundID && a.OrgID == SessionInfo.OrgID).FirstOrDefault();
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
                                    select new { a.CompanyName, a.CompanyID };
                    CompanyList = Companies.AsEnumerable()
                          .Select(o => new tbl_company
                          {
                              CompanyName = o.CompanyName,
                              CompanyID = o.CompanyID
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
                                  select new { a.FirstName, a.WorkerID };
                    WorkerList = Workers.AsEnumerable()
                          .Select(o => new tbl_worker
                          {
                              FirstName = o.FirstName,
                              WorkerID = o.WorkerID
                          }).ToList();

                }

            }

            catch (Exception ex)
            {

            }
            return Json(WorkerList, JsonRequestBehavior.AllowGet);
        }
    }
}