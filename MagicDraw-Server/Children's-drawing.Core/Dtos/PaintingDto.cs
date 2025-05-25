using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Childrens_drawing.Core.Dtos
{
    public class PaintingDto
    {
        public Guid Id { get; set; }
        public string FileName { get; set; }
        public string CategoryName { get; set; }
        public string Url { get; set; }
        //public int Age { get; set; }
        public Guid UserId { get; set; }
    }
}
