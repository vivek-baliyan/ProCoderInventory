using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using PCI.Persistence.Context;

namespace PCI.Persistence
{
    public static class ServiceExtensions
    {
        public static void ConfigurePersistence(this IServiceCollection services, IConfiguration configuration)
        {
            var connection = configuration.GetConnectionString("ApplicationDbContext");
            services.AddDbContext<DataContext>(options => options.UseSqlite(connection));
        }
    }
}