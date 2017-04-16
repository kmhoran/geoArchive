using CrudApp.Enums;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace CrudApp.Models.Documents
{
    public class MapDomain : DocumentDomain
    {
        public int MapId { get; set; }

        public Bounds Bounds { get; set; }

        public int Rotation { get; set; }
    }



    public class Bounds
    {
        public LatLng NorthEast { get; set; }

        public LatLng SouthWest { get; set; }
    }
}