using CrudApp.Models.Documents;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Xml.Linq;

namespace CrudApp.Models.ViewModels
{
    public class BaseVm<T> where T : DocumentDomain
    {
        public T _Document {get; set;}
    }
}