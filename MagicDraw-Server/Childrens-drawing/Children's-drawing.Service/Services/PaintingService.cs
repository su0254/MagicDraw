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
    public class PaintingService:IPaintingService
    {
        readonly IRepositoryManager _repositoryManager;
        readonly IMapper _mapper;
        public PaintingService(IRepositoryManager repositoryManager, IMapper mapper)
        {
            _repositoryManager = repositoryManager;
            _mapper = mapper;
        }
        public PaintingDto Add(PaintingDto paintingDto)
        {
            var p = _mapper.Map<Painting>(paintingDto);
            p = _repositoryManager._paintingRepository.Add(p);
            if (p != null)
                _repositoryManager.Save();
            return _mapper.Map<PaintingDto>(p);
        }

        public bool DeleteById(int id)
        {
            bool succeed = _repositoryManager._paintingRepository.DeleteById(id);
            if(succeed)
                _repositoryManager.Save();
            return succeed;
        }

        public async Task<IEnumerable<PaintingDto>> GetAllAsync()
        {
            var paintings = await _repositoryManager._paintingRepository.GetAllAsync();
            //if (categoryRepository == null) return new List<CategoryDto>();
            return _mapper.Map<IEnumerable<PaintingDto>>(paintings);
        }

        public PaintingDto? GetById(int id)
        {
            var painting = _repositoryManager._paintingRepository.GetById(id);
            if (painting == null)
                return null;
            return _mapper.Map<PaintingDto>(painting);
        }

        public PaintingDto? UpdateById(int id, PaintingDto p)
        {
            var painting = _mapper.Map<Painting>(p);
            painting = _repositoryManager._paintingRepository.UpdateById(id, painting);
            if (painting != null)
                _repositoryManager.Save();
            return _mapper.Map<PaintingDto>(painting);
        }
    }
}
