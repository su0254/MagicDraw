using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Children_s_drawing.Core.Entities;
using Childrens_drawing.Core.Dtos;

namespace Childrens_drawing.Core.InterfacesServices
{
    public interface IAuthService
    {
        public Task<bool> ValidateUser(string userEmail, string password);
        public Task<LoginResDto> LoginAsync(string userEmail, string password);
        public Task<LoginResDto> RegisterAsync(UserDto userDto);
    }
}
