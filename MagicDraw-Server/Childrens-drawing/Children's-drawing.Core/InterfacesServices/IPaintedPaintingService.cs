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
    public interface IPaintedPaintingService
    {
        public Task<IEnumerable<PaintedPaintingDto>> GetAllAsync();
        public Task<PaintedPaintingDto?> GetByIdAsync(Guid id);
        public Task<bool> DeleteByIdAsync(Guid id);
        public Task<PaintedPaintingDto?> UpdateByIdAsync(Guid id, PaintedPaintingDto paintedPaintingDto);
        public Task<PaintedPaintingDto> AddAsync(PaintedPaintingDto paintedPaintingDto, IFormFile image);
    }
}
