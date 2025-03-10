using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
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
        public DateTime CreateAt { get; set; }
        public DateTime UpdateAt { get; set; }

        [ForeignKey(nameof(Id))]
        public string UserId { get; set; }
        User User { get; set; }
        public PaintedPainting()
        {
            Id = Guid.NewGuid();
            CreateAt = DateTime.Now;
            UpdateAt = DateTime.Now;
        }
    }
}
