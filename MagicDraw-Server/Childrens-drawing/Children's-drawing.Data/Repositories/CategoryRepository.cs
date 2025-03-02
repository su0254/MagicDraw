using Children_s_drawing.Core.Entities;
using Children_s_drawing.Core.InterfacesRepositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Children_s_drawing.Data.Repositories
{
    public class CategoryRepository:Repository<Category>,ICategoryRepository
    {
        public CategoryRepository(DataContext dataContext):base(dataContext){}
        
    }
}
