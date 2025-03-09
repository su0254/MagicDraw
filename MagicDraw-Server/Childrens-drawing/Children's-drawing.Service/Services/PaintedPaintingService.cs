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
    public class PaintedPaintingService:IPaintedPaintingService
    {
        readonly IRepositoryManager _repositoryManager;
        readonly IMapper _mapper;
        public PaintedPaintingService(IRepositoryManager repositoryManager, IMapper mapper)
        {
            _repositoryManager = repositoryManager;
            _mapper = mapper;
        }
        public PaintedPaintingDto Add(PaintedPaintingDto paintedPaintingDto)
        {
            var p = _mapper.Map<PaintedPainting>(paintedPaintingDto);
            p = _repositoryManager._paintedPaintingRepository.Add(p);
            if (p != null)
                _repositoryManager.Save();
            return _mapper.Map<PaintedPaintingDto>(p);
        }

        public bool DeleteById(int id)
        {
            bool succeed = _repositoryManager._paintedPaintingRepository.DeleteById(id);
            if(succeed)
                _repositoryManager.Save();
            return succeed;
        }

        public async Task<IEnumerable<PaintedPaintingDto>> GetAllAsync()
        {
            var paintedPaintings = await _repositoryManager._paintedPaintingRepository.GetAllAsync();
            //if (categoryRepository == null) return new List<CategoryDto>();
            return _mapper.Map<IEnumerable<PaintedPaintingDto>>(paintedPaintings);
        }

        public PaintedPaintingDto? GetById(int id)
        {
            var paintedPainting = _repositoryManager._paintedPaintingRepository.GetById(id);
            if (paintedPainting == null)
                return null;
            return _mapper.Map<PaintedPaintingDto>(paintedPainting);
        }

        public PaintedPaintingDto? UpdateById(int id, PaintedPaintingDto p)
        {
            var paintedPainting = _mapper.Map<PaintedPainting>(p);
            paintedPainting = _repositoryManager._paintedPaintingRepository.UpdateById(id, paintedPainting);
            if (paintedPainting != null)
                _repositoryManager.Save();
            return _mapper.Map<PaintedPaintingDto>(paintedPainting);
        }
    }
}
