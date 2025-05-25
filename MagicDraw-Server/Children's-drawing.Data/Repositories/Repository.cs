using Children_s_drawing.Core.InterfacesRepositories;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
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
        public async Task<T> AddAsync(T entity)
        {
            await _dbSet.AddAsync(entity);
            return entity;
        }

        public async Task<bool> DeleteByIdAsync(Guid id)
        {
            var entity = await GetByIdAsync(id);
            if (entity != null)
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

        public async Task<T?> GetByIdAsync(Guid id)
        {
            return await _dbSet.FindAsync(id);
        }

        public async Task<T?> UpdateByIdAsync(Guid id, T entity)
        {
            var temp_entity = await GetByIdAsync(id);
            if (temp_entity == null)
                return entity;

            var idProperty = typeof(T).GetProperty("Id");
            if (idProperty != null && idProperty.CanWrite)
            {
                idProperty.SetValue(temp_entity, id);
            }


            var properties = typeof(T).GetProperties(BindingFlags.Public | BindingFlags.Instance)
                                                    .Where(property => property.Name != "Id"&&property.Name!="Password");
            
            foreach (var property in properties)
            {
                var value = property.GetValue(entity);
                if (value != null)
                {
                    property.SetValue(temp_entity, value);
                }
            }

            return temp_entity;
        }
    }
}
