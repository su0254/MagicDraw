using Children_s_drawing.Core.Entities;
using Childrens_drawing.Core.Dtos;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Children_s_drawing.Core.InterfacesServices
{
    public interface IUserService
    {
        public Task<IEnumerable<UserDto>> GetAllAsync();
        public Task<UserDto?> GetByIdAsync(Guid id);
        public Task<bool> DeleteByIdAsync(Guid id);
        public Task<UserDto?> UpdateByIdAsync(Guid id, UserDto userDto);
        public Task<UserDto> AddAsync(UserDto userDto);
    }
}
