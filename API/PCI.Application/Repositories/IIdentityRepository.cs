using Microsoft.AspNetCore.Identity;
using PCI.Domain.Models;

namespace PCI.Application.Repositories;

public interface IIdentityRepository
{
    #region RoleManager
    Task<IdentityResult> CreateRoleAsync(AppRole role);
    Task<List<AppRole>> GetAllRolesAsync();
    Task<AppRole> FindRoleByNameAsync(string roleName);
    #endregion

    #region UserManager
    Task<IdentityResult> CreateUserAsync(AppUser user, string password);
    Task<IdentityResult> AddUserToRoleAsync(AppUser user, string roleName);
    Task<AppUser> FindUserByIdAsync(string userId);
    Task<AppUser> FindUserByEmailAsync(string email);
    #endregion
}