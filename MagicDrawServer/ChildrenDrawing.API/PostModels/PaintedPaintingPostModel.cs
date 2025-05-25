using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Childrens_drawing.Core.PostModels
{
    public class PaintedPaintingPostModel
    {
        public string FileName { get; set; }
        //public string SorceUrl { get; set; }
        //public string NewUrl { get; set; }
        public Guid UserId { get; set; }
        public IFormFile ImageFile { get; set; }

    }
}
