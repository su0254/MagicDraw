using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Children_s_drawing.Core.Entities;

namespace Childrens_drawing.Core.Dtos
{
    public class LoginResDto
    {
        public UserDto User { get; set; }
        public string Token { get; set; }
    }
}
