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
    public class CategoryService:ICategoryService
    {
        readonly IRepositoryManager _repositoryManager;
        readonly IMapper _mapper;
        public CategoryService(IRepositoryManager repositoryManager, IMapper mapper)
        {
            _repositoryManager = repositoryManager;
            _mapper = mapper;
        }
        public CategoryDto Add(CategoryDto categoty)
        {
            var c = _mapper.Map<Category>(categoty);
            c = _repositoryManager._categoryRepository.Add(c);
            if (c != null)
                _repositoryManager.Save();
            return _mapper.Map<CategoryDto>(c);
        }

        public bool DeleteById(Guid id)
        {
             bool secceed = _repositoryManager._categoryRepository.DeleteById(id);
            if(secceed)
                _repositoryManager.Save();
            return secceed;
        }

        public async Task<IEnumerable<CategoryDto>> GetAllAsync()
        {
            var categorys = await _repositoryManager._categoryRepository.GetAllAsync();
            //if (categoryRepository == null) return new List<CategoryDto>();
            return _mapper.Map<IEnumerable<CategoryDto>>(categorys);
        }

        public CategoryDto? GetById(Guid id)
        {
            var category = _repositoryManager._categoryRepository.GetById(id);
            if (category == null)
                return null;
            return _mapper.Map<CategoryDto>(category);
        }

        public CategoryDto? UpdateById(Guid id, CategoryDto c)
        {
            var category = _mapper.Map<Category>(c);
            category = _repositoryManager._categoryRepository.UpdateById(id, category);
            if (category != null)
                _repositoryManager.Save();
            return _mapper.Map<CategoryDto>(category);
        }
    }
}
