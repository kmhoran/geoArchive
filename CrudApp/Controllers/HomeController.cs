using CrudApp.Models.Documents;
using CrudApp.Models.ViewModels;
using CrudApp.Services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Web.Routing;

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

        [Route("detail/{id:int}")]
        public ActionResult Detail(int id)
        {
            BaseVm<DocumentDomain> vm = new BaseVm<DocumentDomain> { _Document = DocumentService.GetDocumentById(id) };

            return View(vm);
        }


        [Route("map/{id:int}")]
        public ActionResult Map(int id)
        {
            BaseVm<MapDomain> vm = new BaseVm<MapDomain> { _Document = MapService.GetMapByDocumentId(id) };
            if (vm._Document == null || vm._Document.TypeId != Enums.DocumentType.Map)
            {
                // If not a valid map, redirect to document detail page.
                return RedirectToAction("Detail", "Home", new RouteValueDictionary(new { Id = id }));
            }

            return View(vm);

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


        [Route("redirect")]
        public ActionResult Redirect(string response, bool success=true)
        {
            string decoded = Server.UrlDecode(response);

            var vm = new RedirectResponseVM { Response = decoded, Success = success };

            return View(vm);
        }

    }
}