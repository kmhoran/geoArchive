using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace CrudApp.Models.Requests.Documents
{

    public class DocumentRequest
    {
        
        public string Contributor { get; set; }

        public string Description { get; set; }

        public string InstitutionUrl { get; set; }

        public string ResourceUrl { get; set; }

        public string SourceInstitution { get; set; }

        public string Title { get; set; }

        public int Year { get; set; }
    }

    public class LatLng
    {
        public float Lat { get; set; }

        public float Lng { get; set; }
    }

}