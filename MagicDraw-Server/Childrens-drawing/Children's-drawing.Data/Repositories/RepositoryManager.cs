using Children_s_drawing.Core.InterfacesRepositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Children_s_drawing.Data.Repositories
{
    public class RepositoryManager : IRepositoryManager
    {
        DataContext _datacontext;
        public IUserRepository _userRepository { get; }
        public IPaintingRepository _paintingRepository { get; }
        public IPaintedPaintingRepository _paintedPaintingRepository { get; }
        public ICategoryRepository _categoryRepository {  get; }

        public RepositoryManager(DataContext datacontext, IUserRepository userRepository, IPaintingRepository paintingRepository, IPaintedPaintingRepository paintedPaintingRepository, ICategoryRepository categoryRepository)
        {
            _datacontext = datacontext;
            _userRepository = userRepository;
            _paintingRepository = paintingRepository;
            _paintedPaintingRepository = paintedPaintingRepository;
            _categoryRepository = categoryRepository;
        }

        public void Save()
        {
            _datacontext.SaveChanges();
        }
    }
}
