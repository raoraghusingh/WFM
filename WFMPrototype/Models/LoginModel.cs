using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.ComponentModel.DataAnnotations;

namespace WFMPrototype.Models
{
    public class LoginModel
    {
        [Required(ErrorMessage = "Please enter organization id")]
        public int OrginizationID { get; set; }
        [Required(ErrorMessage ="Please enter user name")]
        [EmailAddress(ErrorMessage = "Invalid email address")]
        public string Username { get; set; }

        [Required(ErrorMessage ="Please enter password")]
        public string Password { get; set; }
        public int rolid { get; set; }
    }
}