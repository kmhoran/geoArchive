using CrudApp.Models.Documents;
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
            var map = new MapDomain
            {
                MapId = 1,
                DocumentId = documentId,
                ResourceUrl = "https://tile.loc.gov/image-services/iiif/service:gmd:gmd436:g4363:g4363o:la000032/full/pct:12.5/0/default.jpg",
                TopLat = 33.37526554349371,
                TopLng = -118.14491271972658,
                BottomLat = 33.95987773596287,
                BottomLng = -117.39646911621095,
                Rotate = 0
            };

            return map;
        }
    }
}