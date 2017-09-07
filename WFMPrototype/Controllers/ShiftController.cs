using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using WFMPrototype.DAL;
using WFMPrototype.Models;

namespace WFMPrototype.Controllers
{
    public class ShiftController : Controller
    {
        // GET: Shift
        public ActionResult Index()
        {
            return View();
        }
        [HttpPost]
        [CheckSession]
        public ActionResult AddShift(tbl_shift shiftdetails)
        {
            try
            {
                using (var db = new WFMLiveDataContext())
                {
                    var checkexist = db.tbl_shifts.Where(a => a.ShiftName.ToLower() == shiftdetails.ShiftName.ToLower() && a.IsActive == true && a.OrgID == SessionInfo.OrgID).FirstOrDefault();
                    if (checkexist != null)
                    {
                        return Json("2", JsonRequestBehavior.AllowGet);
                    }
                    tbl_shift shiftentity = new tbl_shift();
                    shiftentity.ShiftName = shiftdetails.ShiftName;
                    shiftentity.StartTime = shiftdetails.StartTime;
                    shiftentity.EndTime = shiftdetails.EndTime;
                    shiftentity.OrgID = SessionInfo.OrgID;
                    shiftentity.ModifyBy = SessionInfo.Username;
                    shiftentity.ModifyDate = System.DateTime.Today.AddHours(5).ToShortDateString();
                    shiftentity.IsActive =true;
                    db.tbl_shifts.InsertOnSubmit(shiftentity);
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
        public ActionResult ShiftList()
        {
            dynamic ShiftList = null;
            try
            {
                using (var db = new WFMLiveDataContext())
                {

                    ShiftList = db.tbl_shifts.Where(a => a.IsActive == true && a.OrgID==SessionInfo.OrgID).ToList();

                }

            }

            catch (Exception ex)
            {

            }
            return Json(ShiftList, JsonRequestBehavior.AllowGet);
        }

        [CheckSession]
        public ActionResult GetDataByShiftID(int ShiftID)
        {
            dynamic ShiftData = null;
            try
            {
                using (var db = new WFMLiveDataContext())
                {

                    ShiftData = db.tbl_shifts.Where(a => a.ShiftID== ShiftID && a.OrgID==SessionInfo.OrgID).FirstOrDefault();

                }

            }
            catch (Exception ex)
            {

            }
            return Json(ShiftData, JsonRequestBehavior.AllowGet);
        }
        [HttpPost]
        [CheckSession]
        public void UpdateShift(tbl_shift shiftdetails)
        {
            try
            {
                using (var db = new WFMLiveDataContext())
                {
                    tbl_shift obj = db.tbl_shifts.Single(a => a.ShiftID == shiftdetails.ShiftID && a.OrgID == SessionInfo.OrgID);
                    obj.ShiftName = shiftdetails.ShiftName;
                    obj.StartTime = shiftdetails.StartTime;
                    obj.EndTime = shiftdetails.EndTime;
                    db.SubmitChanges();

                }

            }
            catch (Exception ex)
            {
               
            }
        }
        [CheckSession]
        public ActionResult RemoveShift(int ShiftID)
        {

            try
            {
                using (var db = new WFMLiveDataContext())
                {
                    tbl_shift Obj = new tbl_shift();
                    Obj = db.tbl_shifts.Where(a => a.ShiftID == ShiftID && a.OrgID==SessionInfo.OrgID).FirstOrDefault();
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