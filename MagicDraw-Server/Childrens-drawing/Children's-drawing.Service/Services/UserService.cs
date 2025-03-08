using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Children_s_drawing.Core.Entities;
using Children_s_drawing.Core.InterfacesRepositories;

namespace Children_s_drawing.Service.Services
{
    public class UserService
    {
        readonly IRepositoryManager _repositoryManager;
        public UserService(IRepositoryManager repositoryManager)
        {
            _repositoryManager = repositoryManager;
        }
        public User Add(User branch)
        {
            if (branch == null) return null;
            return _repositoryManager._userRepository.Add(branch);
        }

        public void DeleteById(int id)
        {
             _repositoryManager._userRepository.DeleteById(id);
        }

        public IEnumerable<User> GetAll()
        {
            IEnumerable<User> paintinghRepository = _repositoryManager._userRepository.GetAll();
            if (paintinghRepository == null) return new List<User>();
            return paintinghRepository;
        }

        public User GetById(int id)
        {
            return _repositoryManager._userRepository.GetById(id);
        }

        public void UpdateById(int id, User u)
        {
            //if (b == null) return false;
            _repositoryManager._userRepository.UpdateById(id, u);
        }
    }
}
