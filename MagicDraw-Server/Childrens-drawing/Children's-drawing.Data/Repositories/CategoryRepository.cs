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
    public class CategoryRepository : Repository<Category>, ICategoryRepository
    {
        public CategoryRepository(DataContext dataContext) : base(dataContext) { }

        public async Task<Category?> GetByNameAsync(string categoryName)
        {
            return await _dbSet.Include(c=>c.Paintings).FirstOrDefaultAsync(c => c.CategoryName.Equals(categoryName));
        }

    }
}
