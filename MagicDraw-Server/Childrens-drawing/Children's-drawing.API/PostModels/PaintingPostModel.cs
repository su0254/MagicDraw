using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Childrens_drawing.Core.PostModels
{
    public class PaintingPostModel
    {
        public string FileName { get; set; }
        public string Category { get; set; }
        public string Url { get; set; }
        public int Age { get; set; }
        public Guid UserId { get; set; }
    }
}
