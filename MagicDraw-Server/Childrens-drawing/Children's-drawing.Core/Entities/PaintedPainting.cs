using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Children_s_drawing.Core.Entities
{
    public class PaintedPainting
    {
        public Guid Id { get; set; }
        public string FileName { get; set; }
        public string SorceUrl { get; set; }
        public string NewUrl { get; set; }
        public int UserId { get; set; }
        public DateTime CreateAt { get; set; }
        public DateTime UpdateAt { get; set; }

        public PaintedPainting()
        {
            Id = Guid.NewGuid();
            CreateAt = DateTime.Now;
            UpdateAt = DateTime.Now;
        }
    }
}
