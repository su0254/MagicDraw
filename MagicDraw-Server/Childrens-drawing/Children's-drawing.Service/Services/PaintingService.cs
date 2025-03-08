using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Children_s_drawing.Core.Entities;
using Children_s_drawing.Core.InterfacesRepositories;

namespace Children_s_drawing.Service.Services
{
    public class PaintingService
    {
        readonly IRepositoryManager _repositoryManager;
        public PaintingService(IRepositoryManager repositoryManager)
        {
            _repositoryManager = repositoryManager;
        }
        public Painting Add(Painting branch)
        {
            if (branch == null) return null;
            return _repositoryManager._paintingRepository.Add(branch);
        }

        public void DeleteById(int id)
        {
             _repositoryManager._paintingRepository.DeleteById(id);
        }

        public IEnumerable<Painting> GetAll()
        {
            IEnumerable<Painting> branchRepository = _repositoryManager._paintingRepository.GetAll();
            if (branchRepository == null) return new List<Painting>();
            return branchRepository;
        }

        public Painting GetById(int id)
        {
            return _repositoryManager._paintingRepository.GetById(id);
        }

        public void UpdateById(int id, Painting p)
        {
            //if (b == null) return false;
            _repositoryManager._paintingRepository.UpdateById(id, p);
        }
    }
}
