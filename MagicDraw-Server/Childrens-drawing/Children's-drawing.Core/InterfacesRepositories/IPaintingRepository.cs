﻿using Children_s_drawing.Core.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Children_s_drawing.Core.InterfacesRepositories
{
    public interface IPaintingRepository:IRepository<Painting>
    {
        //public Task<IEnumerable<Painting>> GetPaintingsByCategoryAsync(string categoryName);
    }
}
