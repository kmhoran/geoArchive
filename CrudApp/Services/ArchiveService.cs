using CrudApp.Models.Documents;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace CrudApp.Services
{
    public class ArchiveService : BaseService
    {
        public static DocumentDomain GetArchiveById(int archiveId)
        {
            DocumentDomain doc = null;
            switch (archiveId)
            {
                case 1:
                    doc = getDoc1();
                    break;

                case 2:
                    doc = getDoc2();
                    break;
                default:
                    doc = getDoc3();
                    break;
            }

            return doc;
        }



        // .........................................................................................

        public static List<DocumentDomain> GetLatestDocuments()
        {
            List<DocumentDomain> latest = new List<DocumentDomain>();

            for (int i = 0; i < 6; i++)
            {
                var doc = GetArchiveById((i % 3) + 1);
                latest.Add(doc);
            }

            return latest;
        }


        // .........................................................................................

        public static DocumentDomain getDoc1()
        {
            DocumentDomain document = new DocumentDomain
            {
                DocumentId = 1,
                Title = "Orange County",
                Date = 1889,
                Contributor = "Carlos",
                Description = "This is a map of Orange County from 1889.",
                ResourceUrl = "https://tile.loc.gov/image-services/iiif/service:gmd:gmd436:g4363:g4363o:la000032/full/pct:12.5/0/default.jpg",
                TypeId = Enums.DocumentType.Map
            };

            return document;
        }


        // .........................................................................................

        public static DocumentDomain getDoc2()
        {
            DocumentDomain document = new DocumentDomain
            {
                DocumentId = 2,
                Title = "LA in 1857",
                Date = 1857,
                Contributor = "John",
                Description = "Picture of LA.",
                ResourceUrl = "https://cdn.loc.gov/service/pnp/ds/03400/03470v.jpg",
                TypeId = Enums.DocumentType.Photo
            };

            return document;
        }


        // .........................................................................................

        public static DocumentDomain getDoc3()
        {
            DocumentDomain document = new DocumentDomain
            {
                DocumentId = 3,
                Title = "LA Rail System",
                Date = 1906,
                Contributor = "Carlos",
                Description = "This is a map of Orange County from 1889.",
                ResourceUrl = "https://tile.loc.gov/image-services/iiif/service:gmd:gmd436:g4364:g4364l:ct001797/full/pct:25/0/default.jpg",
                TypeId = Enums.DocumentType.Map
            };

            return document;
        }

    }
}