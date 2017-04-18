using CrudApp.Models.Documents;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace CrudApp.Services
{
    public class DocumentService : BaseService
    {
        public static DocumentDomain GetDocumentById(int archiveId)
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
                case 3:
                    doc = getDoc3();
                    break;
                default:
                    doc = getDoc4();
                    break;
            }

            return doc;
        }



        // .........................................................................................

        public static List<DocumentDomain> GetNearbyDocuments(LatLng latLng)
        {
            // Should return closest 9 documents
            List<DocumentDomain> nearby = new List<DocumentDomain>();

            for (int i = 0; i < 9; i++)
            {
                var doc = GetDocumentById((i % 4) + 1);
                nearby.Add(doc);
            }

            return nearby;
        } 



        // .........................................................................................

        public static List<DocumentDomain> GetLatestDocuments()
        {
            // Return newest 6
            List<DocumentDomain> latest = new List<DocumentDomain>();

            for (int i = 0; i < 6; i++)
            {
                var doc = GetDocumentById((i % 4) + 1);
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
                Year = 1889,
                Contributor = "Carlos",
                Description = "This is a map of Orange County from 1889. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
                ResourceUrl = "https://tile.loc.gov/image-services/iiif/service:gmd:gmd436:g4363:g4363o:la000032/full/pct:12.5/0/default.jpg",
                TypeId = Enums.DocumentType.Map,
                SourceInstitution = "Library of Congress",
                InstitutionUrl = "https://www.loc.gov/"
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
                Year = 1857,
                Contributor = "John",
                Description = "Picture of LA. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
                ResourceUrl = "https://cdn.loc.gov/service/pnp/ds/03400/03470v.jpg",
                TypeId = Enums.DocumentType.Photo,
                SourceInstitution = "Library of Congress",
                InstitutionUrl = "https://www.loc.gov/"
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
                Year = 1906,
                Contributor = "Carlos",
                Description = "This is a map of Orange County from 1889. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
                ResourceUrl = "https://tile.loc.gov/image-services/iiif/service:gmd:gmd436:g4364:g4364l:ct001797/full/pct:25/0/default.jpg",
                TypeId = Enums.DocumentType.Map,
                SourceInstitution = "Library of Congress",
                InstitutionUrl = "https://www.loc.gov/"
            };

            return document;
        }


        // .........................................................................................

        public static DocumentDomain getDoc4()
        {
            DocumentDomain document = new DocumentDomain
            {
                DocumentId = 4,
                Title = "Steamer at Avalon",
                Year = 1900,
                Contributor = "Maria",
                Description = "Boat docking at Avalon, Catalina Is. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
                ResourceUrl = "https://cdn.loc.gov/service/pnp/det/4a20000/4a27000/4a27500/4a27582v.jpg",
                TypeId = Enums.DocumentType.Photo,
                SourceInstitution = "Library of Congress",
                InstitutionUrl = "https://www.loc.gov/"
            };

            return document;
        }

    }
}