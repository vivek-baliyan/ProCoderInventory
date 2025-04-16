using Mapster;
using Microsoft.AspNetCore.Identity;
using PCI.Application.Repositories;
using PCI.Application.Services.Interfaces;
using PCI.Domain.Models;
using PCI.Shared.Common;
using PCI.Shared.Dtos;

namespace PCI.Application.Services.Implementations;

public class IdentityService(IUnitOfWork unitOfWork) : IIdentityService
{
    private readonly IUnitOfWork _unitOfWork = unitOfWork;

    public async Task<ServiceResult<IdentityResult>> CreateRole(AddAppRoleDto addAppRoleDto)
    {
        var result = await _unitOfWork.IdentityRepository.CreateRoleAsync(addAppRoleDto.Adapt<AppRole>());
        if (!result.Succeeded)
        {
            var errors = result.Errors.Select(e => new Problem(e.Code, e.Description)).ToList();
            return ServiceResult<IdentityResult>.Errors(errors);
        }

        return ServiceResult<IdentityResult>.Success(result);
    }

    public async Task<ServiceResult<IReadOnlyList<AppRoleDto>>> GetAllRoles()
    {
        var roles = await _unitOfWork.IdentityRepository.GetAllRolesAsync();

        return ServiceResult<IReadOnlyList<AppRoleDto>>.Success(roles.Adapt<IReadOnlyList<AppRoleDto>>());
    }

    public async Task<ServiceResult<AppRoleDto>> GetRoleByName(string roleName)
    {
        var role = await _unitOfWork.IdentityRepository.FindRoleByNameAsync(roleName);

        return ServiceResult<AppRoleDto>.Success(role.Adapt<AppRoleDto>());
    }

    public async Task<ServiceResult<IdentityResult>> CreateUser(RegisterUserDto registerUserDto)
    {
        var user = new AppUser
        {
            UserName = registerUserDto.Email,
            Email = registerUserDto.Email,
            CreatedOn = DateTime.UtcNow,
            IsDeleted = false
        };

        var result = await _unitOfWork.IdentityRepository.CreateUserAsync(user, registerUserDto.Password);

        if (result.Succeeded)
        {
            // Assign default role
            var addUserRoleResult = await _unitOfWork.IdentityRepository.AddUserToRoleAsync(user, "Shopper");

            if (!addUserRoleResult.Succeeded)
            {
                var errors = result.Errors.Select(e => new Problem(e.Code, e.Description)).ToList();
                return ServiceResult<IdentityResult>.Errors(errors);
            }
        }

        return ServiceResult<IdentityResult>.Success(result);
    }

    public async Task<ServiceResult<IdentityResult>> AssignRoleToUser(string userEmail, string roleName)
    {
        var user = await _unitOfWork.IdentityRepository.FindUserByEmailAsync(userEmail);

        // Check if the user exists
        if (user == null)
        {
            return ServiceResult<IdentityResult>.Error(new Problem("UserNotFound", $"User with email {userEmail} not found."));
        }

        var result = await _unitOfWork.IdentityRepository.AddUserToRoleAsync(user, roleName);

        if (!result.Succeeded)
        {
            var errors = result.Errors.Select(e => new Problem(e.Code, e.Description)).ToList();
            return ServiceResult<IdentityResult>.Errors(errors);
        }

        return ServiceResult<IdentityResult>.Success(result);
    }

    public async Task<ServiceResult<AppUserDto>> GetUserById(string userId)
    {
        var user = await _unitOfWork.IdentityRepository.FindUserByIdAsync(userId);

        if (user == null)
        {
            return ServiceResult<AppUserDto>.Error(new Problem("UserNotFound", $"User with ID {userId} not found."));
        }

        return ServiceResult<AppUserDto>.Success(user.Adapt<AppUserDto>());
    }

    public async Task<ServiceResult<AppUserDto>> GetUserByEmail(string userEmail)
    {
        var user = await _unitOfWork.IdentityRepository.FindUserByEmailAsync(userEmail);

        if (user == null)
        {
            return ServiceResult<AppUserDto>.Error(new Problem("UserNotFound", $"User with Email {userEmail} not found."));
        }

        return ServiceResult<AppUserDto>.Success(user.Adapt<AppUserDto>());
    }
}
