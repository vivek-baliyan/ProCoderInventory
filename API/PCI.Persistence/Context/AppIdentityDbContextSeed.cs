using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Logging;
using PCI.Domain.Models;
using System.Text.Json;

namespace PCI.Persistence.Context;

public class AppIdentityDbContextSeed
{
    public static async Task SeedRolesAsync(RoleManager<AppRole> roleManager, ILoggerFactory loggerFactory)
    {
        try
        {
            var path = Directory.GetCurrentDirectory();

            if (!roleManager.Roles.Any())
            {
                var rolesData = File.ReadAllText(path + @"/Data/appRoles.json");

                var roles = JsonSerializer.Deserialize<List<AppRole>>(rolesData);

                foreach (var role in roles)
                {
                    await roleManager.CreateAsync(role);
                }
            }
        }
        catch (Exception ex)
        {
            var logger = loggerFactory.CreateLogger<AppIdentityDbContextSeed>();
            logger.LogError(ex.Message);
        }
    }
}
