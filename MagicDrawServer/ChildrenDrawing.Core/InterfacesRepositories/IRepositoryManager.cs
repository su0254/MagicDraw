using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Children_s_drawing.Core.InterfacesRepositories
{
    public interface IRepositoryManager
    {
        public IUserRepository _userRepository { get; }
        public IPaintingRepository _paintingRepository { get; }
        public IPaintedPaintingRepository _paintedPaintingRepository { get; }
        public ICategoryRepository _categoryRepository { get; }
        public Task SaveAsync();
    }
}
