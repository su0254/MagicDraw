using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Children_s_drawing.Core.InterfacesServices
{
    public interface IService<T>
    {
        public Task<IEnumerable<T>> GetAllAsync();
        public T? GetById(Guid id);
        public bool DeleteById(Guid id);
        public T? UpdateById(Guid id, T entity);
        public T Add(T entity);
    }
}
