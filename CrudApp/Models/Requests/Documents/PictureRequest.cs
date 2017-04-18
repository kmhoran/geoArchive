using CrudApp.Models.Documents;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace CrudApp.Models.Requests.Documents
{
    public class PictureRequest: DocumentRequest
    {
        public LatLng Marker { get; set; }
    }
}