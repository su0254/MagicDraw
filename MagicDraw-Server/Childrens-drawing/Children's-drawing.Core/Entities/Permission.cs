using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Childrens_drawing.Core.Entities
{
    [Table("Permission")]
    public class Permission
    {
        public Guid Id { get; set; }
        public string PermissionName { get; set; }
        public string Description { get; set; }
        public List<Role> Roles { get; set; } = new List<Role>();
    }
}
