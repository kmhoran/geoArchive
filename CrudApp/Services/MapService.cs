using CrudApp.Models.Documents;
using CrudApp.Models.Requests.Documents;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace CrudApp.Services
{
    public class MapService
    {
        public static MapDomain GetMapByDocumentId(int documentId)
        {
            if (documentId == 2)
            {
                return null;
            }


            var bounds = new Models.Documents.Bounds
            {
                NorthEast = new Models.Documents.LatLng { Lat = 33.37526554349371f, Lng = -118.14491271972658f },
                SouthWest = new Models.Documents.LatLng { Lat = 33.95987773596287f, Lng = -117.39646911621095f },
            };

            var map = new MapDomain
            {
                MapId = 1,
                DocumentId = documentId,
                ResourceUrl = "https://tile.loc.gov/image-services/iiif/service:gmd:gmd436:g4363:g4363o:la000032/full/pct:12.5/0/default.jpg",
                Bounds = bounds,
                Rotation = 0,
                Contributor = "John Doe",
                Description = "This is a map of Orange County from the 19th c. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
                InstitutionUrl = "https://www.loc.gov/",
                IsPublished = true,
                SourceInstitution = "Library of Congress",
                Title = "OC at the end of the 19th c.",
                TypeId = Enums.DocumentType.Map,
                Year = 1898
            };


            return map;
        }

        public static int ContributeMap(MapRequest model)
        {
            int result = model.Title.Length;

            return result;
        }
    }
}