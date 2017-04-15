using CrudApp.Models.ViewModels;
using CrudApp.Services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace CrudApp.Controllers
{
    [RoutePrefix("home")]
    public class HomeController : Controller
    {
        [Route("index")]
        public ActionResult Index()
        {
            ViewBag.Title = "Home Page";

            return View();
        }

        [Route("detail/{id:int")]
        public ActionResult Detail(int id)
        {
            BaseVm vm = new BaseVm { _Document = ArchiveService.GetDocumentById(id) };

            return View(vm);
        }


        [Route("map/{id:int}")]
        public ActionResult Map(int id)
        {
            BaseVm vm = new BaseVm { _Document = ArchiveService.GetDocumentById(id) };
            if (vm._Document.TypeId == Enums.DocumentType.Map)
            {
                return View(vm);
            }

            return View("Detail.cshtml", vm);

        }


        [Route("golocal")]
        public ActionResult GoLocal()
        {

            return View();
        }


        [Route("search")]
        public ActionResult Search()
        {
            return View();
        }

        [Route("contribute")]
        public ActionResult Contribute()
        {
            return View();
        }


        [Route("success")]
        public ActionResult Success()
        {
            return View();
        }

    }
}