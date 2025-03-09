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
        public T? GetById(int id);
        public bool DeleteById(int id);
        public T? UpdateById(int id, T entity);
        public T Add(T entity);
    }
}
