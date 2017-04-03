using CrudApp.Models.Documents;
using CrudApp.Services;
using Sabio.Web.Models.Responses;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web;
using System.Web.Http;

namespace CrudApp.Controllers.ApiControllers
{
    [RoutePrefix("api/archive")]
    public class ArchiveApiController: BaseApiController
    {
        [Route("{archiveId:int}")]
        public HttpResponseMessage GetDocumentById(int archiveId)
        {
            if(!ModelState.IsValid)
            {
                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, ModelState);
            }

            DocumentDomain document = ArchiveService.GetArchiveById(archiveId);

            var response = new ItemResponse<DocumentDomain> { Item = document };

            return Request.CreateResponse(HttpStatusCode.OK, response);
        }



        // .........................................................................................

        [Route("{archiveId:int}/map")]
        public HttpResponseMessage GetMapByDocumentId(int archiveId)
        {
            if (!ModelState.IsValid)
            {
                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, ModelState);
            }

            MapDomain map = MapService.GetMapByDocumentId(archiveId);

            var response = new ItemResponse<MapDomain> { Item = map };

            return Request.CreateResponse(HttpStatusCode.OK, response);
        }



        // .........................................................................................

        [Route("latest")]
        public HttpResponseMessage GetLatestDocuments()
        {
            if (!ModelState.IsValid)
            {
                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, ModelState);
            }

            List<DocumentDomain> documents = ArchiveService.GetLatestDocuments();

            var response = new ItemsResponse<DocumentDomain> { Items = documents };

            return Request.CreateResponse(HttpStatusCode.OK, response);
        }
    }
}