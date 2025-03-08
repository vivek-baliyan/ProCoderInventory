using Microsoft.AspNetCore.Identity;
using PCI.Shared.Dtos;

namespace PCI.Application.Services.Interfaces;

public interface IIdentityService
{
    Task<AppUserDto> GetUserById(string userId);
    Task<AppRoleDto> GetRoleByName(string roleName);
    Task<IReadOnlyList<AppRoleDto>> GetAllRoles();
    Task<IdentityResult> CreateRole(AddAppRoleDto addAppRoleDto);
}
