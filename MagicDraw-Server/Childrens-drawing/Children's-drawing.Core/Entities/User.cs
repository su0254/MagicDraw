using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Children_s_drawing.Core.Entities
{
    public class User
    {
        public Guid Id { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }
        //public int Role { get; set; }
        public DateTime CreateAt { get; set; }
        public DateTime UpdateAt { get; set; }

        List<PaintedPainting> PaintedPaintings { get; set; }
        List<Painting> Paintings { get; set; }

        public User()
        {
            Id = Guid.NewGuid();
            CreateAt = DateTime.Now;
            UpdateAt = DateTime.Now;
            PaintedPaintings = new List<PaintedPainting>();
            Paintings = new List<Painting>();
        }
    }
}
