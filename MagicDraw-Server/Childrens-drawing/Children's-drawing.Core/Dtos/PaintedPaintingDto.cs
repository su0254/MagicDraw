using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Childrens_drawing.Core.Dtos
{
    public class PaintedPaintingDto
    {
        public Guid Id { get; set; }
        public string FileName { get; set; }
        public string SorceUrl { get; set; }
        public string NewUrl { get; set; }
        public int UserId { get; set; }
    }
}
