using Mapster;
using Microsoft.AspNetCore.Identity;
using PCI.Application.Repositories;
using PCI.Application.Services.Interfaces;
using PCI.Domain.Models;
using PCI.Shared.Dtos;

namespace PCI.Application.Services.Implementations;

public class IdentityService(IUnitOfWork unitOfWork) : IIdentityService
{
    public async Task<AppUserDto> GetUserById(string userId)
    {
        var user = await unitOfWork.IdentityRepository.FindUserByIdAsync(userId);

        return user.Adapt<AppUserDto>();
    }

    public async Task<AppRoleDto> GetRoleByName(string roleName)
    {
        var role = await unitOfWork.IdentityRepository.FindRoleByNameAsync(roleName);

        return role.Adapt<AppRoleDto>();
    }

    public async Task<IReadOnlyList<AppRoleDto>> GetAllRoles()
    {
        var roles = await unitOfWork.IdentityRepository.GetAllRolesAsync();

        return roles.Adapt<IReadOnlyList<AppRoleDto>>();
    }

    public async Task<IdentityResult> CreateRole(AddAppRoleDto addAppRoleDto)
    {
        var result = await unitOfWork.IdentityRepository.CreateRoleAsync(addAppRoleDto.Adapt<AppRole>());
        return result;
    }
}
