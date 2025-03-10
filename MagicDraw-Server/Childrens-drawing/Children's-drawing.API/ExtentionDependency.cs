using Children_s_drawing.Core.InterfacesRepositories;
using Children_s_drawing.Core.InterfacesServices;
using Children_s_drawing.Data;
using Children_s_drawing.Data.Repositories;
using Children_s_drawing.Service.Services;
using Childrens_drawing.Core;

namespace Childrens_drawing.API
{
    public static class ExtentionDependency
    {
        public static void AddDependencies(this IServiceCollection services)
        {
            services.AddScoped<ICategoryRepository, CategoryRepository>();
            services.AddScoped<IPaintedPaintingRepository, PaintedPaintingRepository>();
            services.AddScoped<IPaintingRepository, PaintingRepository>();
            services.AddScoped<IUserRepository, UserRepository>();

            services.AddScoped<ICategoryService, CategoryService>();
            services.AddScoped<IPaintedPaintingService, PaintedPaintingService>();
            services.AddScoped<IPaintingService, PaintingService>();
            services.AddScoped<IUserService, UserService>();

            services.AddScoped(typeof(IRepository<>), typeof(Repository<>));
            services.AddScoped<IRepositoryManager, RepositoryManager>();

            services.AddControllers();
            services.AddScoped<DataContext>();
            services.AddDbContext<DataContext>();

            services.AddAutoMapper(typeof(MappingProfile));
            services.AddAutoMapper(typeof(MappingPostProfile));
        }
    }
}
