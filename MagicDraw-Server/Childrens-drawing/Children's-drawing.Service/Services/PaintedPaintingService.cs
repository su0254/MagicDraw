using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Children_s_drawing.Core.Entities;
using Children_s_drawing.Core.InterfacesRepositories;

namespace Children_s_drawing.Service.Services
{
    public class PaintedPaintingService
    {
        readonly IRepositoryManager _repositoryManager;
        public PaintedPaintingService(IRepositoryManager repositoryManager)
        {
            _repositoryManager = repositoryManager;
        }
        public PaintedPainting Add(PaintedPainting branch)
        {
            if (branch == null) return null;
            return _repositoryManager._paintedPaintingRepository.Add(branch);
        }

        public void DeleteById(int id)
        {
             _repositoryManager._paintedPaintingRepository.DeleteById(id);
        }

        public IEnumerable<PaintedPainting> GetAll()
        {
            IEnumerable<PaintedPainting> paintedpaintingRepository = _repositoryManager._paintedPaintingRepository.GetAll();
            if (paintedpaintingRepository == null) return new List<PaintedPainting>();
            return paintedpaintingRepository;
        }

        public PaintedPainting GetById(int id)
        {
            return _repositoryManager._paintedPaintingRepository.GetById(id);
        }

        public void UpdateById(int id, PaintedPainting p)
        {
            //if (b == null) return false;
            _repositoryManager._paintedPaintingRepository.UpdateById(id, p);
        }
    }
}
