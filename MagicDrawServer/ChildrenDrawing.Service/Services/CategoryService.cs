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
        public async Task<CategoryDto> AddAsync(CategoryDto categoty)
        {
            var c = _mapper.Map<Category>(categoty);
            c = await _repositoryManager._categoryRepository.AddAsync(c);
            if (c != null)
                await _repositoryManager.SaveAsync();
            return _mapper.Map<CategoryDto>(c);
        }

        public async Task<bool> DeleteByIdAsync(Guid id)
        {
            // מחפש את המשתמש
            var category = await _repositoryManager._categoryRepository.GetByIdAsync(id);
            if (category != null)
            {
               
                var paintings = category.Paintings;

                if (paintings != null && paintings.Any())
                {
                    foreach (var painting in paintings)
                    {
                        await _repositoryManager._paintingRepository.DeleteByIdAsync(painting.Id); // מחיקת ציור בודד
                    }
                }

                bool succeed = await _repositoryManager._categoryRepository.DeleteByIdAsync(id);
                if (succeed)
                    await _repositoryManager.SaveAsync();

                return succeed;
            }
            return false; 
        }

        public async Task<IEnumerable<CategoryDto>> GetAllAsync()
        {
            var categorys = await _repositoryManager._categoryRepository.GetAllAsync();
            //if (categoryRepository == null) return new List<CategoryDto>();
            return _mapper.Map<IEnumerable<CategoryDto>>(categorys);
        }

        public async Task<CategoryDto?> GetByIdAsync(Guid id)
        {
            var category = await _repositoryManager._categoryRepository.GetByIdAsync(id);
            if (category == null)
                return null;
            return _mapper.Map<CategoryDto>(category);
        }

        public async Task<CategoryDto?> UpdateByIdAsync(Guid id, CategoryDto c)
        {
            var category = _mapper.Map<Category>(c);
            category = await _repositoryManager._categoryRepository.UpdateByIdAsync(id, category);
            if (category != null)
                await _repositoryManager.SaveAsync();
            return _mapper.Map<CategoryDto>(category);
        }
    }
}
