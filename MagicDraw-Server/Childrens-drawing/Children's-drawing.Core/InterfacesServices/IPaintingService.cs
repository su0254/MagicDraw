using Children_s_drawing.Core.Entities;
using Childrens_drawing.Core.Dtos;
using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Children_s_drawing.Core.InterfacesServices
{
    public interface IPaintingService
    {
        public Task<IEnumerable<PaintingDto>> GetAllAsync();
        public Task<PaintingDto?> GetByIdAsync(Guid id);
        public Task<bool> DeleteByIdAsync(Guid id);
        public Task<PaintingDto?> UpdateByIdAsync(Guid id, PaintingDto paintingDto);
        public Task<PaintingDto> AddAsync(PaintingDto paintingDto, IFormFile image);
        public Task<IEnumerable<Painting>> GetPaintingsByCategoryAsync(string categoryName);

    }
}
