using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace CrudApp.Models.ViewModels
{
    public class RedirectResponseVM
    {
        public bool Success {get; set; }

        public string Response { get; set; }
    }
}