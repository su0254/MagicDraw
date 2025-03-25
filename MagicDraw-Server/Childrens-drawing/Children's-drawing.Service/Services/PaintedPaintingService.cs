using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AutoMapper;
using Children_s_drawing.Core.Entities;
using Children_s_drawing.Core.InterfacesRepositories;
using Children_s_drawing.Core.InterfacesServices;
using Childrens_drawing.Core.Dtos;

namespace Children_s_drawing.Service.Services
{
    public class PaintedPaintingService : IPaintedPaintingService
    {
        readonly IRepositoryManager _repositoryManager;
        readonly IMapper _mapper;
        public PaintedPaintingService(IRepositoryManager repositoryManager, IMapper mapper)
        {
            _repositoryManager = repositoryManager;
            _mapper = mapper;
        }

        public async Task<PaintedPaintingDto> AddAsync(PaintedPaintingDto paintedPaintingDto)
        {
            var p = _mapper.Map<PaintedPainting>(paintedPaintingDto);

            var user = await _repositoryManager._userRepository.GetByIdAsync(p.UserId);
            if (user == null)
            {
                throw new Exception("User not found");
            }
            user.PaintedPaintings.Add(p);

            p = await _repositoryManager._paintedPaintingRepository.AddAsync(p);
            if (p != null)
                await _repositoryManager.SaveAsync();
            return _mapper.Map<PaintedPaintingDto>(p);
        }

        public async Task<bool> DeleteByIdAsync(Guid id)
        {
            bool succeed = await _repositoryManager._paintedPaintingRepository.DeleteByIdAsync(id);
            if (succeed)
                await _repositoryManager.SaveAsync();
            return succeed;
        }

        public async Task<IEnumerable<PaintedPaintingDto>> GetAllAsync()
        {
            var paintedPaintings = await _repositoryManager._paintedPaintingRepository.GetAllAsync();
            return _mapper.Map<IEnumerable<PaintedPaintingDto>>(paintedPaintings);
        }

        public async Task<PaintedPaintingDto?> GetByIdAsync(Guid id)
        {
            var paintedPainting = await _repositoryManager._paintedPaintingRepository.GetByIdAsync(id);
            if (paintedPainting == null)
                return null;
            return _mapper.Map<PaintedPaintingDto>(paintedPainting);
        }

        public async Task<PaintedPaintingDto?> UpdateByIdAsync(Guid id, PaintedPaintingDto p)
        {
            var paintedPainting = _mapper.Map<PaintedPainting>(p);
            paintedPainting = await _repositoryManager._paintedPaintingRepository.UpdateByIdAsync(id, paintedPainting);
            if (paintedPainting != null)
                await _repositoryManager.SaveAsync();
            return _mapper.Map<PaintedPaintingDto>(paintedPainting);
        }
    }
}
