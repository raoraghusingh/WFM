using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Web.Routing;
using WFMPrototype.Models;


namespace WFMPrototype.Models
{
    public class CheckSession : ActionFilterAttribute
    {
        public override void OnActionExecuting(ActionExecutingContext filterContext)
        {
            if(filterContext.HttpContext.Request.Cookies["OrgID"] !=null && filterContext.HttpContext.Request.Cookies["Username"] != null)
            {
                SessionInfo.OrgID = Convert.ToInt32(filterContext.HttpContext.Request.Cookies["OrgID"].Value);
                SessionInfo.Username = filterContext.HttpContext.Request.Cookies["Username"].Value;
                SessionInfo.RoleID= Convert.ToInt32(filterContext.HttpContext.Request.Cookies["RoleID"].Value);
            }
            else
            {
                filterContext.Result = new RedirectToRouteResult(new RouteValueDictionary{
                                          { "controller", "Login" },
                                          { "action", "Index" }

                                        });
            }
           // var controllerName = filterContext.RouteData.Values["controller"];
           // var actionName = filterContext.RouteData.Values["action"];
           // var message = String.Format("{0} controller:{1} action:{2}", "onactionexecuting", controllerName, actionName);
           //// Debug.WriteLine(message, "Action Filter Log");
           // base.OnActionExecuting(filterContext);
        }
    }
}