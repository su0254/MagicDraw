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
using Childrens_drawing.Core.Entities;

namespace Children_s_drawing.Service.Services
{
    public class UserService : IUserService
    {
        readonly IRepositoryManager _repositoryManager;
        readonly IMapper _mapper;
        public UserService(IRepositoryManager repositoryManager, IMapper mapper)
        {
            _repositoryManager = repositoryManager;
            _mapper = mapper;
        }

        public async Task<IEnumerable<UserDto>> GetAllAsync()
        {
            var users = await _repositoryManager._userRepository.GetAllAsync();
            return _mapper.Map<IEnumerable<UserDto>>(users);
        }

        public async Task<UserDto?> GetByIdAsync(Guid id)
        {
            var user = await _repositoryManager._userRepository.GetByIdAsync(id);
            if (user == null)
                return null;
            return _mapper.Map<UserDto>(user);
        }

        public async Task<bool> DeleteByIdAsync(Guid id)
        {
            // מחפש את המשתמש
            var user = await _repositoryManager._userRepository.GetByIdAsync(id);
            if (user != null)
            {
                // נניח שיש לך List של ציורים במשתמש
                var paintedPaintings = user.PaintedPaintings; // נניח ש-Paintings הוא List של ציורים

                if (paintedPaintings != null && paintedPaintings.Any())
                {
                    foreach (var paintedPainting in paintedPaintings)
                    {
                        await _repositoryManager._paintingRepository.DeleteByIdAsync(paintedPainting.Id); // מחיקת ציור בודד
                    }
                }

                // עכשיו מוחקים את המשתמש
                bool succeed = await _repositoryManager._userRepository.DeleteByIdAsync(id);
                if (succeed)
                    await _repositoryManager.SaveAsync();

                return succeed;
            }
            return false; // אם המשתמש לא נמצא
        }

        public async Task<UserDto?> UpdateByIdAsync(Guid id, UserDto u)
        {
            var user = _mapper.Map<User>(u);
            user = await _repositoryManager._userRepository.UpdateByIdAsync(id, user);
            if (user != null)
                await _repositoryManager.SaveAsync();
            return _mapper.Map<UserDto>(user);
        }

        public async Task<UserDto> AddAsync(UserDto userDto)
        {
            var u = _mapper.Map<User>(userDto);
            var userByEmail = await _repositoryManager._userRepository.GetByEmailAsync(u.Email);
            if (userByEmail != null)
                return null;

            var user = new User
            {
                FirstName = u.FirstName,
                LastName = u.LastName,
                Email = u.Email,
                Password = BCrypt.Net.BCrypt.HashPassword(u.Password),
                CreatedAt = DateTime.UtcNow,
                UpdatedAt = DateTime.UtcNow,
                Roles = new List<Role> { new Role { RoleName = "Editor" } }
            };

            u = await _repositoryManager._userRepository.AddAsync(u);
            if (u != null)
                await _repositoryManager.SaveAsync();
            return _mapper.Map<UserDto>(u);
        }
    }
}
