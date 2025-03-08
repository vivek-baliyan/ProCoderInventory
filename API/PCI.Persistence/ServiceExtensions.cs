using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using PCI.Application.Repositories;
using PCI.Application.Services.Implementations;
using PCI.Application.Services.Interfaces;
using PCI.Persistence.Context;
using PCI.Persistence.Repositories;

namespace PCI.Persistence;

public static class ServiceExtensions
{
    public static void ConfigurePersistence(this IServiceCollection services, IConfiguration configuration)
    {
        var identityConnection = configuration.GetConnectionString("IdentityConnection");
        services.AddDbContext<AppIdentityDbContext>(options => options.UseSqlite(identityConnection));

        var applicationConnection = configuration.GetConnectionString("ApplicationConnection");
        services.AddDbContext<ApplicationDbContext>(options => options.UseSqlite(applicationConnection));

        services.AddScoped(typeof(IGenericRepository<>), typeof(GenericRepository<>));
        services.AddScoped<IUnitOfWork, UnitOfWork>();
        services.AddScoped<IIdentityRepository, IdentityRepository>();

        services.AddScoped<IUserAccessorService, UserAccessorService>();
    }
}
