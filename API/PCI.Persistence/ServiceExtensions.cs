using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using PCI.Application.Repositories;
using PCI.Persistence.Context;
using PCI.Persistence.Repositories;

namespace PCI.Persistence;

public static class ServiceExtensions
{
    public static void ConfigurePersistence(this IServiceCollection services, IConfiguration configuration)
    {
        var connection = configuration.GetConnectionString("ApplicationDbContext");
        services.AddDbContext<ApplicationDbContext>(options => options.UseSqlite(connection));

        services.AddScoped(typeof(IGenericRepository<>), typeof(GenericRepository<>));
        services.AddScoped<IUnitOfWork, UnitOfWork>();
        services.AddScoped<IIdentityRepository, IdentityRepository>();
    }
}
