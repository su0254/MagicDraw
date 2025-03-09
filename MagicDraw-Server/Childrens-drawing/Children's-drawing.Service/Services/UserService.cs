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
    public class UserService:IUserService
    {
        readonly IRepositoryManager _repositoryManager;
        readonly IMapper _mapper;
        public UserService(IRepositoryManager repositoryManager, IMapper mapper)
        {
            _repositoryManager = repositoryManager;
            _mapper = mapper;
        }
        public UserDto Add(UserDto userDto)
        {
            var u = _mapper.Map<User>(userDto);
            u = _repositoryManager._userRepository.Add(u);
            if (u != null)
                _repositoryManager.Save();
            return _mapper.Map<UserDto>(u);
        }

        public bool DeleteById(int id)
        {
            bool succeed = _repositoryManager._userRepository.DeleteById(id);
            if(succeed) 
                _repositoryManager.Save();
            return succeed;
        }

        public async Task<IEnumerable<UserDto>> GetAllAsync()
        {
            var users = await _repositoryManager._userRepository.GetAllAsync();
            //if (categoryRepository == null) return new List<CategoryDto>();
            return _mapper.Map<IEnumerable<UserDto>>(users);
        }

        public UserDto? GetById(int id)
        {
            var user = _repositoryManager._userRepository.GetById(id);
            if (user == null)
                return null;
            return _mapper.Map<UserDto>(user);
        }

        public UserDto? UpdateById(int id, UserDto u)
        {
            var user = _mapper.Map<User>(u);
            user = _repositoryManager._userRepository.UpdateById(id, user);
            if (user != null)
                _repositoryManager.Save();
            return _mapper.Map<UserDto>(user);
        }
    }
}
