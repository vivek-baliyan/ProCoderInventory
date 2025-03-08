using PCI.Application.Repositories;
using PCI.Application.Services.Interfaces;
using PCI.Domain.Models;

namespace PCI.Application.Services.Implementations;

public class IdentityService(IUnitOfWork unitOfWork) : IIdentityService
{
    public async Task<AppUser> GetUserById(string userId)
    {
        return await unitOfWork.IdentityRepository.FindUserByIdAsync(userId);
    }
}
