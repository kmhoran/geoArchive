using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace CrudApp.Models.Requests.Documents
{
    public class MapRequest : DocumentRequest
    {
        public Bounds Bounds { get; set; }

        public int Rotation { get; set; }

    }

    public class Bounds
    {
        public LatLng NorthEast { get; set; }

        public LatLng SouthWest { get; set; }
    }

}