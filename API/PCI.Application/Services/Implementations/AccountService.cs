using PCI.Application.Repositories;
using PCI.Application.Services.Interfaces;
using PCI.Domain.Models;
using PCI.Shared.Common;
using PCI.Shared.Dtos;

namespace PCI.Application.Services.Implementations;

public class AccountService(IUnitOfWork unitOfWork) : IAccountService
{
    private readonly IUnitOfWork _unitOfWork = unitOfWork;

    public async Task<ServiceResult<UserProfile>> CreateUserProfile(string userId, RegisterUserDto registerUserDto)
    {
        var existingUserProfile = await _unitOfWork.Repository<UserProfile>()
            .GetFirstOrDefaultAsync(x => x.UserId == userId);

        // Check if the user profile already exists
        if (existingUserProfile != null)
        {
            return ServiceResult<UserProfile>.Success(existingUserProfile);
        }
        try
        {
            var userProfile = new UserProfile
            {
                UserId = userId,
                FirstName = registerUserDto.FirstName,
                LastName = registerUserDto.LastName,
                ProfileImageUrl = registerUserDto.ProfileImageUrl,
                DateOfBirth = registerUserDto.DateOfBirth,
                Country = registerUserDto.Country,
                StreetAddress = registerUserDto.StreetAddress,
                City = registerUserDto.City,
                State = registerUserDto.State,
                PostalCode = registerUserDto.PostalCode,
                Bio = registerUserDto.Bio,
                CompanyName = registerUserDto.CompanyName,
                ContactPerson = registerUserDto.ContactPerson,
                WebsiteUrl = registerUserDto.WebsiteUrl,
                CreatedBy = userId,
                CreatedOn = DateTime.UtcNow,
            };

            _unitOfWork.Repository<UserProfile>().Add(existingUserProfile);
            await _unitOfWork.SaveChangesAsync();

            return ServiceResult<UserProfile>.Success(userProfile);
        }
        catch (Exception ex)
        {
            return ServiceResult<UserProfile>.Error(
                new Problem("UserProfileCreationError", ex.ToString()));
        }
    }
}