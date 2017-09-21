using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace WFMPrototype.Models
{
    public class CheckList
    {
        public int ChecklistID { get; set; }
        public int CompanyID { get; set; }
        public string CompanyName { get; set; }
        public string WorkName { get; set; }
        public string WorkInterval { get; set; }
        public Array Shiftlist { get; set; }
    }
}