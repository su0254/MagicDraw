using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Children_s_drawing.Core.Entities;
using static System.Net.Mime.MediaTypeNames;
using System;
using System.ComponentModel.DataAnnotations;

namespace Childrens_drawing.Core.Entities
{
    [Table("Role")]
    public class Role
    {
        [Key]
        public Guid Id { get; set; } // Unique Identifier

        [Required(ErrorMessage = "The 'RoleName' field is required.")]
        [StringLength(50, MinimumLength = 2, ErrorMessage = "The name cannot exceed 50 characters.")]
        public string RoleName { get; set; } // Role Name

        //[Required(ErrorMessage = "The 'Description' field is required.")]
        public string Description { get; set; } = "descraption"; // Role Description
        public DateTime CreatedAt { get; set; } // Role Creation Date
        public DateTime UpdatedAt { get; set; } // Last Updated Date

        public List<Permission> Permissions { get; set; }
        public List<User> Users { get; set; }
        public Role()
        {
            Id = Guid.NewGuid();
            CreatedAt = DateTime.Now;
            UpdatedAt = DateTime.Now;
            Permissions = new List<Permission>();
            Users = new List<User>();
        }

    }
}
