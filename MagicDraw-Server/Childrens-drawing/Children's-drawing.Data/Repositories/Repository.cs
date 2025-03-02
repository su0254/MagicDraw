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

        public void DeleteById(int id)
        {
            var entity = GetById(id);
            if(entity != null) 
                _dbSet.Remove(entity);
        }

        public IEnumerable<T> GetAll()
        {
            return _dbSet.ToList();
        }

        public T? GetById(int id)
        {
            return _dbSet.Find(id);
        }

        public T? UpdateById(int id, T entity)
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
