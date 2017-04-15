using CrudApp.Models.Requests.Documents;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace CrudApp.Services
{
    public class PictureService
    {
        public static int ContributePicture(PictureRequest model)
        {
            int result = model.Title.Length;

            return result;
        }
    }
}