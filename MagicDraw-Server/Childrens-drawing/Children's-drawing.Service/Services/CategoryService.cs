using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Children_s_drawing.Core.Entities;
using Children_s_drawing.Core.InterfacesRepositories;

namespace Children_s_drawing.Service.Services
{
    public class CategoryService
    {
        readonly IRepositoryManager _repositoryManager;
        public CategoryService(IRepositoryManager repositoryManager)
        {
            _repositoryManager = repositoryManager;
        }
        public Category Add(Category categoty)
        {
            if (categoty == null) return null;
            return _repositoryManager._categoryRepository.Add(categoty);
        }

        public void DeleteById(int id)
        {
             _repositoryManager._categoryRepository.DeleteById(id);
        }

        public IEnumerable<Category> GetAll()
        {
            IEnumerable<Category> categoryRepository = _repositoryManager._categoryRepository.GetAll();
            if (categoryRepository == null) return new List<Category>();
            return categoryRepository;
        }

        public Category GetById(int id)
        {
            return _repositoryManager._categoryRepository.GetById(id);
        }

        public void UpdateById(int id, Category c)
        {
            //if (c == null) return false;
             _repositoryManager._categoryRepository.UpdateById(id, c);
        }
    }
}
