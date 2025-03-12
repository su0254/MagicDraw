using Children_s_drawing.Core.Entities;
using Children_s_drawing.Core.InterfacesRepositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Children_s_drawing.Data.Repositories
{
    public class PaintingRepository:Repository<Painting>, IPaintingRepository
    {
        public PaintingRepository(DataContext dataContext):base(dataContext)
        {
           
        }
    }
}
