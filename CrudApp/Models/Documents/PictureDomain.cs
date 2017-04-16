using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace CrudApp.Models.Documents
{
    public class PictureDomain: DocumentDomain
    {
        public int PictureId { get; set; }

        public LatLng Marker { get; set; }
    }
}