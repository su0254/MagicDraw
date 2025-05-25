using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;

namespace Childrens_drawing.Core.Dtos
{
    public class PaintedPaintingDto
    {
        public Guid Id { get; set; }
        public string FileName { get; set; }
        //public string SorceUrl { get; set; }
        public string Url { get; set; }
        public Guid UserId { get; set; }
        public IFormFile ImageFile { get; set; }
    }
}
