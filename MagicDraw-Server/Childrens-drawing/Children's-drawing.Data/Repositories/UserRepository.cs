using Children_s_drawing.Core.Entities;
using Children_s_drawing.Core.InterfacesRepositories;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Children_s_drawing.Data.Repositories
{
    public class UserRepository : Repository<User>, IUserRepository
    {
        public UserRepository(DataContext dataContext) : base(dataContext)
        {
        }

        public async Task<User?> GetByEmailAsync(string email)
        {
            if(string.IsNullOrWhiteSpace(email))
            {
                return null;
            }
            return await _dbSet.Include(u => u.Roles).FirstOrDefaultAsync(user => user.Email == email);
        }
    }
}
