using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Childrens_drawing.Core.Entities;

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
        public DateTime CreatedAt { get; set; }
        public DateTime UpdatedAt { get; set; }

        public List<PaintedPainting> PaintedPaintings { get; set; }
        public List<Painting> Paintings { get; set; }
        public List<Role> Roles { get; set; } = new List<Role>();
        public User()
        {
            Id = Guid.NewGuid();
            CreatedAt = DateTime.Now;
            UpdatedAt = DateTime.Now;
            PaintedPaintings = new List<PaintedPainting>();
            Paintings = new List<Painting>();
            Roles = new List<Role>();
        }
    }
}
