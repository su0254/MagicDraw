using Children_s_drawing.Core.InterfacesRepositories;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using System.Text;
using System.Threading.Tasks;

namespace Children_s_drawing.Data.Repositories
{
    public class Repository<T> : IRepository<T> where T : class
    {
        protected readonly DbSet<T> _dbSet;

        public Repository(DataContext dataContext)
        {
            _dbSet = dataContext.Set<T>();
        }
        public T Add(T entity)
        {
            _dbSet.Add(entity);
            return entity;
        }

        public bool DeleteById(Guid id)
        {
            var entity = GetById(id);
            if(entity != null)
            {
                 _dbSet.Remove(entity);
                return true;
            }
            return false;   
        }

        public async Task<IEnumerable<T>> GetAllAsync()
        {
            return await _dbSet.ToListAsync();
        }

        public T? GetById(Guid id)
        {
            return _dbSet.Find(id);
        }

        public T? UpdateById(Guid id, T entity)
        {
            var temp_entity = GetById(id);
            if (temp_entity == null)
                return null;

            var properties = typeof(T).GetProperties(BindingFlags.Public | BindingFlags.Instance)
                                                    .Where(property => property.Name != "id");
            foreach (var property in properties)
            {
                var value = property.GetValue(entity);
                if (value != null)
                {
                    property.SetValue(entity, value);
                }
            }
            return entity;
        }
    }
}
