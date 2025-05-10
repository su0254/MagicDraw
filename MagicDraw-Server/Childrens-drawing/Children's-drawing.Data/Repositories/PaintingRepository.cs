using Children_s_drawing.Core.Entities;
using Children_s_drawing.Core.InterfacesRepositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using CloudinaryDotNet;
using CloudinaryDotNet.Actions;
using dotenv.net;
using Microsoft.EntityFrameworkCore;

namespace Children_s_drawing.Data.Repositories
{
    public class PaintingRepository : Repository<Painting>, IPaintingRepository
    {
        //readonly DbSet<Painting> _paintingDbSet;
        public PaintingRepository(DataContext dataContext) : base(dataContext)
        {
            //_paintingDbSet = dataContext.Set<Painting>();
        }
        public async Task<IEnumerable<Painting>> GetPaintingsByCategoryAsync(string categoryName)
        {
            return await _dbSet.Where(p => p.CategoryName == categoryName).ToListAsync();
        }
    }
}

