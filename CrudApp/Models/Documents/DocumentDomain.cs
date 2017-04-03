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

        public string Title { get; set; }

        public int Date { get; set; }

        public string Contributor { get; set; }

        public string Description { get; set; }

        public string SourceInstritution { get; set; }

        public string ResourceUrl { get; set; }

        public bool IsPublished { get; set; }

        public DocumentType TypeId { get; set; }

    }
}