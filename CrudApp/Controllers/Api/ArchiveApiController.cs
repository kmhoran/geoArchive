﻿using CrudApp.Models.Documents;
using CrudApp.Models.Requests.Documents;
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
    public class ArchiveApiController : BaseApiController
    {
        [Route("{archiveId:int}"), HttpGet]
        public HttpResponseMessage GetDocumentById(int archiveId)
        {
            if (!ModelState.IsValid)
            {
                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, ModelState);
            }

            DocumentDomain document = DocumentService.GetDocumentById(archiveId);

            var response = new ItemResponse<DocumentDomain> { Item = document };

            return Request.CreateResponse(HttpStatusCode.OK, response);
        }



        // .........................................................................................

        [Route("{archiveId:int}/map"), HttpGet]
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

        [Route("map"), HttpPost]
        public HttpResponseMessage ContributeMap(MapRequest model)
        {
            if (!ModelState.IsValid)
            {
                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, ModelState);
            }
            int num = MapService.ContributeMap(model);

            var response = new ItemResponse<int> { Item = num };

            return Request.CreateResponse(HttpStatusCode.OK, response);

        }




        // .........................................................................................

        [Route("picture"), HttpPost]
        public HttpResponseMessage ContributePicture(PictureRequest model)
        {
            if (!ModelState.IsValid)
            {
                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, ModelState);
            }
            int num = PictureService.ContributePicture(model);

            var response = new ItemResponse<int> { Item = num };

            return Request.CreateResponse(HttpStatusCode.OK, response);

        }


        // .........................................................................................

        [Route("nearby"), HttpGet]
        public HttpResponseMessage GetNearbyDocumetns([FromUri] LatLng location)
        {
            if (!ModelState.IsValid)
            {
                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, ModelState);
            }

            List<DocumentDomain> docList = DocumentService.GetNearbyDocuments(location);

            var response = new ItemsResponse<DocumentDomain> { Items = docList };

            return Request.CreateResponse(HttpStatusCode.OK, response);
        }



        // .........................................................................................

        [Route("latest"), HttpGet]
        public HttpResponseMessage GetLatestDocuments()
        {
            if (!ModelState.IsValid)
            {
                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, ModelState);
            }

            List<DocumentDomain> documents = DocumentService.GetLatestDocuments();

            var response = new ItemsResponse<DocumentDomain> { Items = documents };

            return Request.CreateResponse(HttpStatusCode.OK, response);
        }
    }
}