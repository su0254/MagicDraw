using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Children_s_drawing.Core.Entities
{
    public class Category
    {
        public Guid Id { get; set; }
        public string CategoryName { get; set; }
        public DateTime CreateAt { get; set; }
        public DateTime UpdateAt { get; set; }
        List<Painting> Paintings {  get; set; }
        public Category() 
        {
            Id = Guid.NewGuid();
            CreateAt = DateTime.Now;
            UpdateAt = DateTime.Now;
            Paintings = new List<Painting>();
        }

    }
}
