using CrudApp.Enums;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace CrudApp.Models.Documents
{
    public class MapDomain
    {
        public int MapId { get; set; }

        public int DocumentId { get; set; }

        public string ResourceUrl { get; set; }

        public double TopLat { get; set; }

        public double TopLng { get; set; }

        public double BottomLat { get; set; }

        public double BottomLng { get; set; }

        public int Rotate { get; set; }
    }
}