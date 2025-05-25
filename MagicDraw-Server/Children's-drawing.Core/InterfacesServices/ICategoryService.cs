using Children_s_drawing.Core.Entities;
using Childrens_drawing.Core.Dtos;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Children_s_drawing.Core.InterfacesServices
{
    public interface ICategoryService
    {
        public Task<IEnumerable<CategoryDto>> GetAllAsync();
        public Task<CategoryDto?> GetByIdAsync(Guid id);
        public Task<bool> DeleteByIdAsync(Guid id);
        public Task<CategoryDto?> UpdateByIdAsync(Guid id, CategoryDto categoryDto);
        public Task<CategoryDto> AddAsync(CategoryDto categoryDto);
    }
}
