using CrudApp.Enums;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace CrudApp.Models.Documents
{
    public class DocumentDomain
    {
        public int DocumentId { get; set; }

        public string Contributor { get; set; }

        public string Description { get; set; }

        public string InstitutionUrl { get; set; }

        public bool IsPublished { get; set; }

        public string SourceInstitution { get; set; }

        public string ResourceUrl { get; set; }

        public string Title { get; set; }

        public DocumentType TypeId { get; set; }

        public int Year { get; set; }

    }

    public class LatLng
    {
        public float Lat { get; set; }

        public float Lng { get; set; }
    }

}