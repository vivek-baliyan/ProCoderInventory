using Microsoft.AspNetCore.Identity;
using PCI.Domain.Models;

namespace PCI.Application.Repositories;

public interface IIdentityRepository
{
    Task<IdentityResult> CreateUserAsync(AppUser user, string password);
    Task<IdentityResult> CreateRoleAsync(AppRole role);
    Task<IdentityResult> AddUserToRoleAsync(AppUser user, string roleName);
    Task<AppUser> FindUserByIdAsync(string userId);
    Task<AppRole> FindRoleByNameAsync(string roleName);
}