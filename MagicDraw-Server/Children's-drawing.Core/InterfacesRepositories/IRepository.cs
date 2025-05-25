using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Children_s_drawing.Core.InterfacesRepositories
{
    public interface IRepository<T>
    {
        public Task<IEnumerable<T>> GetAllAsync();
        public Task<T?> GetByIdAsync(Guid id);
        public Task<bool> DeleteByIdAsync(Guid id);
        public Task<T?> UpdateByIdAsync(Guid id, T entity);
        public Task<T> AddAsync(T entity);
    }
}
