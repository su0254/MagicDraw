﻿using Children_s_drawing.Core.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Children_s_drawing.Core.InterfacesRepositories
{
    public interface IUserRepository:IRepository<User>
    {
        public Task<User?> GetByEmailAsync(string email);
    }
}
