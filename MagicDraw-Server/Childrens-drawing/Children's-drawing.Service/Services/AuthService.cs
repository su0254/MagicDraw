using AutoMapper;
using Children_s_drawing.Core.Entities;
using Children_s_drawing.Core.InterfacesRepositories;
using Childrens_drawing.Core.Dtos;
using Childrens_drawing.Core.Entities;
using Childrens_drawing.Core.InterfacesServices;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using Org.BouncyCastle.Crypto.Generators;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

namespace Childrens_drawing.Service.Services
{
    public class AuthService : IAuthService
    {
        private readonly IConfiguration _configuration;
        private readonly IRepositoryManager _repositoryManager;
        private readonly IMapper _mapper;

        public AuthService(IConfiguration configuration, IRepositoryManager repositoryManager, IMapper mapper)
        {
            _configuration = configuration;
            _repositoryManager = repositoryManager;
            _mapper = mapper;
        }

        private string GenerateJwtToken(User user)
        {
            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["Jwt:Key"]));
            var credentials = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

            var claims = new List<Claim>
            {
                new Claim(ClaimTypes.NameIdentifier, user.Id.ToString()),
                new Claim(ClaimTypes.Name, user.Email),
                //new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString())
            };
            claims.AddRange(user.Roles.Select(role => new Claim(ClaimTypes.Role, role.RoleName)));

            var token = new JwtSecurityToken(
                issuer: _configuration["Jwt:Issuer"],
                audience: _configuration["Jwt:Audience"],
                claims: claims,
                expires: DateTime.UtcNow.AddHours(3),
                signingCredentials: credentials
            );

            return new JwtSecurityTokenHandler().WriteToken(token);
        }

        public async Task<bool> ValidateUser(string userEmail, string password)
        {
            var user = await _repositoryManager._userRepository.GetByEmailAsync(userEmail);

            return user != null && BCrypt.Net.BCrypt.Verify(password, user.Password);
        }

        public async Task<LoginResDto> LoginAsync(string usernameOrEmail, string password)
        {
            if (await ValidateUser(usernameOrEmail, password))
            {
                var user = await _repositoryManager._userRepository.GetByEmailAsync(usernameOrEmail);
                var token = GenerateJwtToken(user);
                return new LoginResDto
                {
                    User = _mapper.Map<UserDto>(user),
                    Token = token
                };
            }
            return null;
        }

        public async Task<LoginResDto> RegisterAsync(UserDto userDto)
        {
            var userByEmail = await _repositoryManager._userRepository.GetByEmailAsync(userDto.Email);
            if (userByEmail != null)
                return null;

            var user = new User
            {
                FirstName = userDto.FirstName,
                LastName = userDto.LastName,
                Email = userDto.Email,
                Password = BCrypt.Net.BCrypt.HashPassword(userDto.Password),
                CreatedAt = DateTime.UtcNow,
                UpdatedAt = DateTime.UtcNow,
                Roles = new List<Role> { new Role { RoleName = "Editor" } }
            };

            var result = await _repositoryManager._userRepository.AddAsync(user);
            if (result == null)
            {
                return null;
            }
            await _repositoryManager.SaveAsync();

            var resultDto = _mapper.Map<UserDto>(result);
            var token = GenerateJwtToken(result);
            return new LoginResDto
            {
                User = resultDto,
                Token = token
            };
        }
    }
}
