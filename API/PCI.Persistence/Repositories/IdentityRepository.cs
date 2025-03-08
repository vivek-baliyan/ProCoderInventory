using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using PCI.Application.Repositories;
using PCI.Domain.Models;

namespace PCI.Persistence.Repositories;

public class IdentityRepository(UserManager<AppUser> userManager, RoleManager<AppRole> roleManager) : IIdentityRepository
{
    public async Task<IdentityResult> CreateUserAsync(AppUser user, string password)
    {
        return await userManager.CreateAsync(user, password);
    }

    public async Task<IdentityResult> CreateRoleAsync(AppRole role)
    {
        return await roleManager.CreateAsync(role);
    }

    public async Task<IdentityResult> AddUserToRoleAsync(AppUser user, string roleName)
    {
        return await userManager.AddToRoleAsync(user, roleName);
    }

    public async Task<AppUser> FindUserByIdAsync(string userId)
    {
        return await userManager.FindByIdAsync(userId);
    }

    public async Task<AppRole> FindRoleByNameAsync(string roleName)
    {
        return await roleManager.FindByNameAsync(roleName);
    }

    public async Task<List<AppRole>> GetAllRolesAsync()
    {
        return await roleManager.Roles.ToListAsync();
    }
}