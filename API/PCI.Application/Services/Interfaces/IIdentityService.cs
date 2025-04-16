using Microsoft.AspNetCore.Identity;
using PCI.Shared.Common;
using PCI.Shared.Dtos;

namespace PCI.Application.Services.Interfaces;

public interface IIdentityService
{
    Task<ServiceResult<IdentityResult>> CreateRole(AddAppRoleDto addAppRoleDto);
    Task<ServiceResult<IReadOnlyList<AppRoleDto>>> GetAllRoles();
    Task<ServiceResult<AppRoleDto>> GetRoleByName(string roleName);

    Task<ServiceResult<IdentityResult>> CreateUser(RegisterUserDto registerUserDto);
    Task<ServiceResult<IdentityResult>> AssignRoleToUser(string userEmail, string roleName);
    Task<ServiceResult<AppUserDto>> GetUserById(string userId);
    Task<ServiceResult<AppUserDto>> GetUserByEmail(string userEmail);
}
