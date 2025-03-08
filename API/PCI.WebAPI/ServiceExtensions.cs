using Microsoft.AspNetCore.Identity;
using PCI.Domain.Models;
using PCI.Persistence.Context;

namespace PCI.WebAPI;

public static class ServiceExtensions
{
    public static void ConfigureWebApi(this IServiceCollection services)
    {
        services.AddCors(options =>
        {
            options.AddPolicy("CorsApi", corsPolicyBuilder =>
                corsPolicyBuilder.WithOrigins("*")
                    .AllowAnyHeader()
                    .AllowAnyMethod());
        });

        // Add Identity with your custom implementations
        services.AddIdentity<AppUser, AppRole>(options =>
        {
            // Configure identity options
            options.Password.RequireDigit = true;
            options.Password.RequiredLength = 8;
            options.Password.RequireNonAlphanumeric = true;
            options.Password.RequireUppercase = true;
            options.Password.RequireLowercase = true;

            options.User.RequireUniqueEmail = true;
        })
        .AddEntityFrameworkStores<AppIdentityDbContext>()
        .AddDefaultTokenProviders();
    }
}
