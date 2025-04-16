using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using PCI.Application.Repositories;
using PCI.Domain.Models;

namespace PCI.Persistence.Repositories;

public class IdentityRepository(UserManager<AppUser> userManager, RoleManager<AppRole> roleManager) : IIdentityRepository
{
    private readonly UserManager<AppUser> _userManager = userManager;
    private readonly RoleManager<AppRole> _roleManager = roleManager;
    #region RoleManager

    public async Task<IdentityResult> CreateRoleAsync(AppRole role)
    {
        return await _roleManager.CreateAsync(role);
    }

    public async Task<List<AppRole>> GetAllRolesAsync()
    {
        return await _roleManager.Roles.ToListAsync();
    }

    public async Task<AppRole> FindRoleByNameAsync(string roleName)
    {
        return await _roleManager.FindByNameAsync(roleName);
    }

    #endregion

    #region UserManager

    public async Task<IdentityResult> CreateUserAsync(AppUser user, string password)
    {
        return await _userManager.CreateAsync(user, password);
    }

    public async Task<IdentityResult> AddUserToRoleAsync(AppUser user, string roleName)
    {
        return await _userManager.AddToRoleAsync(user, roleName);
    }

    public async Task<AppUser> FindUserByIdAsync(string userId)
    {
        return await _userManager.FindByIdAsync(userId);
    }

    public async Task<AppUser> FindUserByEmailAsync(string email)
    {
        return await _userManager.FindByEmailAsync(email);
    }
    #endregion
}